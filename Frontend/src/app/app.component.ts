import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App implements OnInit, OnDestroy {

    public translate = inject(TranslateService);
    private subscription = new Subscription();

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
