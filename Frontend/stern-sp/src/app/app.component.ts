import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})

// TODO Font Resizing
export class AppComponent implements OnInit, OnDestroy {
    public drawerVisible: WritableSignal<boolean> = signal(false);

    private translate: TranslateService = inject(TranslateService);
    private subscription: Subscription = new Subscription();
    public ngOnInit(): void {
        this.setHtmlLangAttribute(this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en');
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

    public openDrawer(): void {
        this.drawerVisible.set(true);
    }
    private setHtmlLangAttribute(lang: string): void {
        if (lang && typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', lang);
        }
    }
}
