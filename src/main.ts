import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import localeFr from "@angular/common/locales/fr";
import { registerLocaleData } from "@angular/common";
import { register } from "swiper/element/bundle";

registerLocaleData(localeFr);
register();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
