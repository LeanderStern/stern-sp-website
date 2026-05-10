import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Message } from 'primeng/message';

interface Star {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
}

@Component({
  selector: 'app-hero-section',
  imports: [Message, NgOptimizedImage, TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements OnDestroy {
  protected readonly showScrollIndicator = signal(false);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('starCanvas');
  private stars: Star[] = [];
  private resizeObserver?: ResizeObserver;
  private animFrameId?: number;

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.showScrollIndicator.set(true), 5000);
      this.initStars();
      this.setupCanvas();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.animFrameId !== undefined) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private seededRng(seed: number): () => number {
    let s = seed;
    return () => {
      s = Math.imul(s, 1664525) + 1013904223;
      return (s >>> 0) / 4294967296;
    };
  }

  private initStars(count = 80): void {
    const rng = this.seededRng(42);
    this.stars = Array.from({ length: count }, () => {
      const r = rng();
      return {
        x: rng(),
        y: rng(),
        radius: r < 0.625 ? 0.5 : r < 0.875 ? 1 : 1.5,
        phase: rng() * Math.PI * 2,
        speed: 0.3 + rng() * 1.2,
      };
    });
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas?.parentElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = canvas.parentElement!.clientHeight;
    };

    this.resizeObserver = new ResizeObserver(setSize);
    this.resizeObserver.observe(canvas.parentElement);
    setSize();

    this.startAnimation(ctx, canvas);
  }

  private startAnimation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const loop = (t: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const s of this.stars) {
        const opacity = 0.1 + 0.75 * ((Math.sin(t * 0.001 * s.speed + s.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }
}
