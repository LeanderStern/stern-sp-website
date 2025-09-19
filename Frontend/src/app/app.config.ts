import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay, } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@primeuix/themes/types';
import { definePreset } from '@primeuix/themes';
import { InterpolatableTranslationObject, provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import Aura from '@primeuix/themes/aura';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withFetch } from '@angular/common/http';


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
    },
})
export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(withEventReplay()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        providePrimeNG({
            ripple: true,
            theme: {
                preset: sternSPConfig
            },
        }),
        provideHttpClient(withFetch()),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: '/i18n/',
                suffix: '.json'
            }),
            fallbackLang: 'en',
        }),
        provideAppInitializer((): Observable<InterpolatableTranslationObject> => {
            const translate: TranslateService = inject(TranslateService);
            return translate.use('en');
        })
    ],
};
