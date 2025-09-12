import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appHoverFx]',
  standalone: true
})
export class HoverFxDirective implements OnInit, OnDestroy {
  @Input() hoverScale = 1.03;
  @Input() hoverRotate = 0;
  @Input() hoverShadow = true;

  private tl?: gsap.core.Tween;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    gsap.set(this.el.nativeElement, { transformOrigin: 'center center' });
  }

  @HostListener('mouseenter') onEnter() {
    this.tl?.kill();
    this.tl = gsap.to(this.el.nativeElement, {
      scale: this.hoverScale,
      rotation: this.hoverRotate,
      duration: 0.2,
      ease: 'power2.out',
      boxShadow: this.hoverShadow ? '0 12px 24px rgba(0,0,0,0.12)' : undefined
    });
  }

  @HostListener('mouseleave') onLeave() {
    this.tl?.kill();
    this.tl = gsap.to(this.el.nativeElement, {
      scale: 1,
      rotation: 0,
      duration: 0.2,
      ease: 'power2.out',
      boxShadow: this.hoverShadow ? '0 0 0 rgba(0,0,0,0)' : undefined
    });
  }

  ngOnDestroy(): void {
    this.tl?.kill();
  }
}


