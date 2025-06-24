import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/auth-service';
import { FavorisService } from '@core/favoris/favoris-service';
import { userStore } from '@core/state/user/user-store';
import { WishlistService } from '@core/wishlist/wishlist-service';
import { SectionWrapper } from '@shared/component/ui/sectionWrapper/section-wrapper';
import { MemberSincePipe } from '@shared/pipe/member-since-pipe';
import { Bookmark, Clock, Heart, LogOut, LucideAngularModule, MessageSquare, Package, Pen } from 'lucide-angular';
import { CartService } from '@core/cart/cart-service';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideAngularModule, SectionWrapper, RouterLink, MemberSincePipe],
})
export default class ProfilComponent {
    protected readonly Bookmark = Bookmark;
    protected readonly MessageSquare = MessageSquare;
    protected readonly Heart = Heart;
    protected readonly Package = Package;
    protected readonly Pen = Pen;
    protected readonly Clock = Clock;
    protected readonly LogOut = LogOut;

    protected readonly auth = inject(AuthService);
    protected readonly userStore = inject(userStore);
    protected readonly favorisService = inject(FavorisService);
    protected readonly cartService = inject(CartService);
    protected readonly wishlistService = inject(WishlistService);
    protected readonly authService = inject(AuthService);
    protected readonly router = inject(Router);
    protected favorisCount = signal(0);
    protected wishlistCount = signal(0);

    constructor() {
        effect(async () => {
            const user = await this.userStore.loadUser();
            if (user) {
                this.favorisService.getFavorisCount(user.id).subscribe((count) => {
                    this.favorisCount.set(count);
                });
                this.wishlistService.getWishlistCount(user.id).subscribe((count) => {
                    this.wishlistCount.set(count);
                });

                await this.cartService.syncGuestCartToUser(user.id);
            }
        });


    }

    logout() {
        void this.authService.signOut().then(() => {
            void this.router.navigate(['/connexion']);
        });
    }
}
