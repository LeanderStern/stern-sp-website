import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay, } from '@angular/platform-browser';
import { InterpolatableTranslationObject, provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@primeuix/themes/types';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const sternSPConfig: Preset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}'
        },
        colorScheme: {
            dark: {
                primary: {
                    color: '{slate.50}',
                    inverseColor: '{slate.950}',
                    hoverColor: '{slate.100}',
                    activeColor: '{slate.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            },
            light: {
                primary: {
                    color: '{slate.50}',
                    inverseColor: '{slate.950}',
                    hoverColor: '{slate.100}',
                    activeColor: '{slate.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
})

// TODO automatically detect language
export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(withEventReplay()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideAnimationsAsync(),
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
