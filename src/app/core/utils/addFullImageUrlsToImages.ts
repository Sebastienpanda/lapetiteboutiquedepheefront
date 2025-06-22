import { environment } from "@environments/environment";
// import type { Image } from "@shared/component/response-images/image-model";
//
// export function addFullImageUrlsToImages(images: Image[]): Image[] {
// 	const baseUrl = environment.baseImgUrl;
// 	return (images ?? []).map((img) => ({
// 		...img,
// 		url: img.url ? baseUrl + img.url : "",
// 		formats: img.formats
// 			? Object.fromEntries(
// 					Object.entries(img.formats).map(([key, format]) => [
// 						key,
// 						{
// 							...format,
// 							url: format.url ? baseUrl + format.url : "",
// 						},
// 					]),
// 				)
// 			: undefined,
// 	}));
// }
