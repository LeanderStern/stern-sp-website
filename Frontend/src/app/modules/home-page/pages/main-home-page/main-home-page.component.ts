import { Component, signal, WritableSignal } from '@angular/core';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { Carousel } from 'primeng/carousel';
import { GALLERY_IMAGE_METADATA } from '../../../shared/constants/gallery-image-metadata';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { NgOptimizedImage } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-home-page',
    imports: [
        SplashScreenComponent,
        Carousel,
        NgOptimizedImage,
        PrimeTemplate,
        TranslatePipe
    ],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.scss',
})
export class MainHomePageComponent {

    public splashScreenFinished: WritableSignal<boolean> = signal<boolean>(false);
    public readonly imageMetadata: GalleryImageMetadata[] = GALLERY_IMAGE_METADATA;
    public onSplashScreenFinished(): void {
        this.splashScreenFinished.set(true);
    }

    public translateCarouselImage(id: number): {[klass: string]: string} {
        const index: number = this.imageMetadata.findIndex((metadata) => metadata.id === id);
        if (index === 0 || index % 3 === 0) {
            return {};
        }
        else if (index % 2 === 0) {
            return {};
        }
        return {'width': '100px'};
    }
}
