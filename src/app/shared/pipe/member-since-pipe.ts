import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
	name: "memberSince",
})
export class MemberSincePipe implements PipeTransform {
	transform(value: string | Date, locale: string = navigator.language): string {
		if (!value) return "";

		const date = new Date(value);
		const formatted = date.toLocaleDateString(locale, {
			day: "numeric",
			month: "long",
			year: "numeric",
		});

		return `Membre depuis le ${formatted}`;
	}
}
