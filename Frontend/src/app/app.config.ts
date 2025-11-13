import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay, } from '@angular/platform-browser';
import { InterpolatableTranslationObject, provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(withEventReplay()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideAnimationsAsync(),
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
