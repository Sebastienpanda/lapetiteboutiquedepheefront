export interface ImageFormats {
	large: { url: string; url_webp: string };
	small: { url: string; url_webp: string };
	thumbnail: { url: string; url_webp: string };
}

export interface CoverImage {
	id: string;
	product_id: string;
	image_url: string;
	image_url_webp: string;
	image: ImageFormats;
	cover: boolean;
}
