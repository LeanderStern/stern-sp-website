import { Component, signal, WritableSignal } from '@angular/core';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { GALLERY_IMAGE_METADATA } from '../../../shared/constants/gallery-image-metadata';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Message } from 'primeng/message';
import { NgOptimizedImage } from '@angular/common';
import { HeroSection } from '../../components/hero-section/hero-section';

@Component({
  selector: 'app-main-home-page',
  imports: [
    SplashScreenComponent,
    CarouselComponent,
    TranslatePipe,
    Message,
    NgOptimizedImage,
    HeroSection,
  ],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.css',
})

// TODO title für die projekte, bilder optimieren, gsap plugin imports zentralisieren, font scaling mit screensize
export class MainHomePageComponent {
  public splashScreenFinished: WritableSignal<boolean> = signal<boolean>(false);
  public readonly imageMetadata: GalleryImageMetadata[] = GALLERY_IMAGE_METADATA;
}
