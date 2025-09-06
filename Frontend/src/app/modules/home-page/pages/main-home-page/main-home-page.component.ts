import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ALREADY_VISITED } from '../../../shared/constants/session-storage';
import { gsap, SplitText } from '../../../shared/constants/gsap'
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-home-page.component',
    imports: [
        TranslatePipe
    ],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.scss',
})
export class MainHomePageComponent implements OnInit {

    public showSplashScreen: boolean;
    public displaySplashScreenText: WritableSignal<boolean> = signal<boolean>(false)

    public ngOnInit(): void {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return
        }
        this.showSplashScreen = Boolean(!sessionStorage.getItem(ALREADY_VISITED));

        if (this.showSplashScreen) {
            SplitText.create('.split', {
                type: 'lines, words',
                mask: 'lines',
                autoSplit: true,
                wordsClass: 'mb-2',
                onSplit(self) {
                    return gsap.from(self.words, {duration: 1,
                        onStart: (): void => {
                            document.querySelector('#splash-screen-cover').remove();
                        },
                        y: 100,
                        autoAlpha: 0,
                        stagger: 0.05,
                        ease: 'power3.out'}
                    );
                }
            });
        }
    }
}
