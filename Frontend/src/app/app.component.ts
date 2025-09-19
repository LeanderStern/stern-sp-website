import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Breadcrumb } from 'primeng/breadcrumb';
import { AsyncPipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';

@Component({
    imports: [RouterModule, Breadcrumb, AsyncPipe, Drawer, Button],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

    public homeRoute: MenuItem = {
        icon: 'stern-sp-icon',
    };
    public currentRoute$: Observable<MenuItem[]>;
    private translate: TranslateService = inject(TranslateService);
    private subscription: Subscription = new Subscription();
    private router: Router = inject(Router);

    public constructor() {
        this.currentRoute$ = this.router.events.pipe(
            filter((x) => x instanceof NavigationEnd),
            map((x: NavigationEnd): MenuItem[] => {
                return x.url.split('/').filter((x) => x.length > 0).map((x): MenuItem => {
                    return {label: x};
                })
            }),
        );
    }
    public ngOnInit(): void {
        // Set initial lang attribute
        this.setHtmlLangAttribute(this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en');

        // Subscribe to language changes
        const languageChangeSubscription: Subscription = this.translate.onLangChange.subscribe(
            (event: LangChangeEvent) => {
                this.setHtmlLangAttribute(event.lang);
            }
        );
        this.subscription.add(languageChangeSubscription);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setHtmlLangAttribute(lang: string): void {
        if (lang && typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', lang);
        }
    }
}
