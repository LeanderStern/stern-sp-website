import { AfterViewInit, Component, computed, input, InputSignal, OnDestroy, signal, } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { horizontalLoop } from './utils/horizontalLoop';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import Context = gsap.Context;

type Timeline = gsap.core.Timeline;

@Component({
  selector: 'app-carousel',
    imports: [CommonModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})

// TODO look inside horizontal loop and somehow cap velocity and disable next when throwing
export class CarouselComponent implements AfterViewInit, OnDestroy {

    public imageElements: InputSignal<GalleryImageMetadata[]> = input.required();

    public activeElementIndex = signal<number | null>(null);
    // TODO Digga was los
    public imageElementOffset = computed((): Map<number, string> => {
        const activeIndex = this.activeElementIndex();
        if (activeIndex !== null) {
            const imageElements = this.imageElements();
            const offsets = new Map();
            for (let i = 0; i < imageElements.length; i++) {
                if (i < activeIndex) {
                    offsets.set(i, 'previous');
                }
                if (i === activeIndex) {
                    offsets.set(i, 'active');
                }
                if (i > activeIndex) {
                    offsets.set(i, 'next');
                }
            }
            const a = new Map([
                [(activeIndex - 1) % imageElements.length, 'previous'],
                [activeIndex, 'active'],
                [(activeIndex + 1) % imageElements.length, 'next'],
            ]);
            return a;
        }
        else {
            return new Map();
        }
    });

    public isMouseOverImage = false;

    private animationContext!: Context;
    private loop!: Timeline;
    private intervalId!: number;

    public ngAfterViewInit(): void {
        const boxes = document.querySelectorAll<HTMLElement>('.box');
        this.animationContext = gsap.context((): void => {
            this.loop = horizontalLoop(boxes, {
                paused: true,
                draggable: true,
                center: true, // the active element is the one in the center of the container rather than the left edge
                onChange: (element: HTMLElement, index: number) => {
                    this.activeElementIndex.set(index);
                }
            }) as unknown as Timeline;
        });
        this.next();
        this.intervalId = window.setInterval(() => this.isMouseOverImage ? null : this.next(), 5000);
    }

    public previous(): void {
        return;
    }

    public toggleOverflow(): void {
        return;
    }

    public next(): void {
        this.loop['next']({duration: 1, ease: 'power1.inOut'});
    }

    public onMouseOverImage(isOverImage: boolean): void {
        this.isMouseOverImage = isOverImage;
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.intervalId);
        this.animationContext.kill();
    }
}
