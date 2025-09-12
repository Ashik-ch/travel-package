import { Injectable, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private pluginsRegistered = false;

  constructor(private zone: NgZone) {}

  registerPlugins(): void {
    if (this.pluginsRegistered) return;
    gsap.registerPlugin(ScrollTrigger);
    this.pluginsRegistered = true;
  }

  runOutsideAngular<T>(fn: () => T): T {
    return this.zone.runOutsideAngular(fn);
  }
}


