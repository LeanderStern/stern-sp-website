import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { GALLERY_IMAGE_METADATA } from '../../../shared/constants/gallery-image-metadata';
import { GalleryImageMetadata } from '../../../shared/interfaces/gallery-image-metadata';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Message } from 'primeng/message';
import { NgOptimizedImage } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { Divider } from 'primeng/divider';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';


@Component({
  selector: 'app-main-home-page',
  imports: [
    SplashScreenComponent,
    CarouselComponent,
    TranslatePipe,
    Message,
    NgOptimizedImage,
    HeroSectionComponent,
    Divider,
  ],
  templateUrl: './main-home-page.component.html',
  styleUrl: './main-home-page.component.css',
})

// TODO title für die projekte, bilder optimieren, gsap plugin imports zentralisieren, font scaling mit screensize
// TODO fill ersetzen mit gesetzten width and height ratios weil das sind nur ratios und keine gesetzten werte
export class MainHomePageComponent implements OnInit {
  public splashScreenFinished: WritableSignal<boolean> = signal<boolean>(false);
  public readonly imageMetadata: GalleryImageMetadata[] = GALLERY_IMAGE_METADATA;

  public ngOnInit(): void {
    gsap.registerPlugin(ScrollSmoother);
    const smoother = ScrollSmoother.create({
      content: '#content-wrapper',
      smooth: 0,
    });
    smoother.effects('#quote-image', { speed: 0.8 });
  }
}
