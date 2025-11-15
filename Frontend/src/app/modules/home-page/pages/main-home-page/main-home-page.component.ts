import { Component, signal, WritableSignal } from '@angular/core';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { GALLERY_IMAGE_METADATA } from '../../../shared/constants/gallery-image-metadata';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-main-home-page',
    imports: [
        SplashScreenComponent,
        CarouselComponent,
        Button
    ],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.scss',
})

// TODO title für die projekte, bilder optimieren, gsap plugin imports zentralisieren, font scaling mit screensize
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
