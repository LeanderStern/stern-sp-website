import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Message } from 'primeng/message';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  imports: [Message, NgOptimizedImage, TranslatePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit {
  protected showScrollIndicator: WritableSignal<boolean> = signal<boolean>(false);

  public ngOnInit() {
    setTimeout(() => this.showScrollIndicator.set(true), 5000);
  }
}
