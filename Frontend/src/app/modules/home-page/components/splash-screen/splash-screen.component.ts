import { AfterViewInit, Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ALREADY_VISITED } from '../../../shared/constants/session-storage';
import { gsap, SplitText } from '../../../shared/constants/gsap';

@Component({
  selector: 'app-splash-screen',
    imports: [
        TranslatePipe
    ],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
})
export class SplashScreenComponent implements AfterViewInit {

    public showSplashScreen: WritableSignal<boolean> = signal<boolean>(true);
    public finished: OutputEmitterRef<void> = output<void>();

    private animationContext = gsap.context((): void => {
        return;
    });
    private timeline = gsap.timeline();
    private splitText: SplitText;

    public ngAfterViewInit(): void {
        this.showSplashScreen.set(Boolean(!sessionStorage.getItem(ALREADY_VISITED)));
        sessionStorage.setItem(ALREADY_VISITED, 'true');
        if (this.showSplashScreen()) {
            this.runSplashScreenAnimation();
        }
    }

    private runSplashScreenAnimation(): void {
        this.splitText = SplitText.create('.split', {
            type: 'lines, words',
            mask: 'lines',
            autoSplit: true,
            wordsClass: 'mb-2 z-[100]',
            onSplit: (self) => {
                return this.animationContext.add(() => this.timeline.from(self.words, {
                    duration: 1,
                    y: 100,
                    autoAlpha: 0,
                    stagger: 0.05,
                    ease: 'power3.out',
                    onStart: (): void => {
                        const cover: Element | null = document.querySelector('#splash-screen-cover');
                        if (cover) {
                            cover.remove();
                        }
                    },
                }));
            }
        });
        this.runCleanupAnimation();
    }

    private runCleanupAnimation(): void {
        this.animationContext.add(() => {
            this.timeline.to(this.splitText.lines, {
                y: 100,
                autoAlpha: 0,
                duration: 1,
                ease: 'power3.out'
            });
            this.timeline.to('.splash-screen-half', {
                height: 0,
                duration: 1,
                ease: 'power3.out',
                onComplete: (): void => {
                    this.showSplashScreen.set(false);
                    this.animationContext.kill();
                    this.finished.emit();
                }
            }, '<0.5');
        });
    }
}
