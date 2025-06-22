import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import localeFr from "@angular/common/locales/fr";
import { register } from "swiper/element/bundle";
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeFr);
register();
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
