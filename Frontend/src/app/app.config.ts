import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay, } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

const sternSPConfig: Preset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{amber.50}',
            100: '{amber.100}',
            200: '{amber.200}',
            300: '{amber.300}',
            400: '{amber.400}',
            500: '{amber.500}',
            600: '{amber.600}',
            700: '{amber.700}',
            800: '{amber.800}',
            900: '{amber.900}',
            950: '{amber.950}'
        }
    }
})

export const appConfig: ApplicationConfig = {
  providers: [
      provideClientHydration(withEventReplay()),
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(appRoutes),
      provideAnimationsAsync(),
      providePrimeNG({
          ripple: true,
          theme: {
              preset: sternSPConfig
          },
      }),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideHttpClient(withFetch()),
      provideTranslateService({
          loader: provideTranslateHttpLoader({
              prefix: '/i18n/',
              suffix: '.json'
          }),
          fallbackLang: 'en',
          lang: 'en'
      }),
      provideAppInitializer((): void => {
          const translate: TranslateService = inject(TranslateService);
          const browserLang: string | undefined = translate.getBrowserLang();
          if (browserLang) {
              translate.use(translate.getBrowserLang())
          }
      })
  ],
};
