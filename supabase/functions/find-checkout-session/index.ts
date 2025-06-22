import Stripe from 'https://esm.sh/stripe@18.2.1?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {});

Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
    };

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { session_id } = await req.json();

        if (!session_id) {
            return new Response(JSON.stringify({ error: 'session_id manquant' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items.data.price.product', 'customer'],
        });

        const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
            expand: ['data.price.product'],
        });

        const items = lineItems.data.map((item) => {
            const product = item.price?.product as Stripe.Product;
            return {
                name: product.name,
                quantity: item.quantity,
                price: (item.price?.unit_amount ?? 0) / 100,
                image: product.images?.[0] ?? null,
            };
        });

        const customer = {
            name: session.customer_details?.name,
            email: session.customer_details?.email,
            address: session.customer_details?.address,
        };

        const result = {
            id: session.id,
            amount_total: (session.amount_total ?? 0) / 100,
            currency: session.currency,
            items,
            customer,
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Erreur récupération session Stripe :', error);
        return new Response(
            JSON.stringify({ error: 'Erreur lors de la récupération de la session' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
        );
    }
});
