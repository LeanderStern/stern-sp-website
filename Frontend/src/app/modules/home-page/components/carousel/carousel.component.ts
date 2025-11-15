import { AfterViewInit, Component, computed, input, InputSignal, OnDestroy, signal, } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { horizontalLoop } from './utils/horizontalLoop';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { Button } from 'primeng/button';
import { CarouselImagePositionLabel } from '../../enums/carousel-image-position-label';
import Context = gsap.Context;

type Timeline = gsap.core.Timeline;

@Component({
  selector: 'app-carousel',
    imports: [CommonModule, NgOptimizedImage, TranslatePipe, Button],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})

// TODO look inside horizontal loop and somehow cap velocity, disable next when throwing, mobile scaling
export class CarouselComponent implements AfterViewInit, OnDestroy {

    public imageElements: InputSignal<GalleryImageMetadata[]> = input.required();
    public autoScroll = input(false);

    public activeElementIndex = signal<number | null>(null);

    public labelImagePosition = computed((): Map<number, string> | null => {
        const activeIndex = this.activeElementIndex();
        if (activeIndex !== null) {
            const imageElements = this.imageElements();
            return new Map([
                [(activeIndex - 1) % imageElements.length, CarouselImagePositionLabel.Previous],
                [activeIndex, CarouselImagePositionLabel.Active],
                [(activeIndex + 1) % imageElements.length, CarouselImagePositionLabel.Next],
            ]);
        }
        else {
            return null;
        }
    });

    public isMouseOverImage = false;

    private animationContext?: Context;
    private loop!: Timeline;
    private intervalId?: number;

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
        this.loop[CarouselImagePositionLabel.Next]({duration: 0}); // centers the carousel to the next element

        if (this.autoScroll() && !this.isMouseOverImage) {
            this.intervalId = window.setInterval(() => this.loop[CarouselImagePositionLabel.Next]({duration: 1, ease: 'power1.inOut'}), 8000);
        }
    }

    public previous(): void {
        this.loop[CarouselImagePositionLabel.Previous]({duration: 0.5, ease: 'power1.inOut'});
    }

    public next(): void {
        this.loop[CarouselImagePositionLabel.Next]({duration: 0.5, ease: 'power1.inOut'});
    }

    public onMouseOverImage(isOverImage: boolean): void {
        this.isMouseOverImage = isOverImage;
    }

    public ngOnDestroy(): void {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
        }
        if (this.animationContext) {
            this.animationContext.kill();
        }
    }
}
