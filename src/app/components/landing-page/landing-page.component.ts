import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverFxDirective } from 'src/app/directives/hover.directive';

interface DestinationSection {
  code: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HoverFxDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  sections: DestinationSection[] = [
    { code: 'usa', title: 'United States of America', imageUrl: 'assets/images/a.jpg' },
    { code: 'uk', title: 'United Kingdom', imageUrl: 'assets/images/b.jpg' },
    { code: 'fr', title: 'France', imageUrl: 'assets/images/c.jpg' },
    { code: 'uae', title: 'United Arab Emirates', imageUrl: 'assets/images/d.jpg' },
    { code: 'jp', title: 'Japan', imageUrl: 'assets/images/e.jpg' },
    { code: 'cn', title: 'China', imageUrl: 'assets/images/f.jpg' },
    { code: 'in', title: 'India', imageUrl: 'assets/images/g.jpg' }
  ];

  private ctx?: gsap.Context;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
      this.ctx = gsap.context(() => {
        const containers = gsap.utils.toArray<HTMLElement>('.lp-section');

        containers.forEach((section) => {
          const bg = section.querySelector<HTMLElement>('.lp-bg');
          const title = section.querySelector<HTMLElement>('.lp-title');
          if (!bg || !title) return;

          gsap.set(bg, { y: -60 });
          gsap.to(bg, {
            y: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });

          gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });
    });
  }


  // Group into pairs for md/xl layout
get sectionPairs() {
  const pairs: DestinationSection[][] = [];
  for (let i = 0; i < this.sections.length; i += 2) {
    pairs.push(this.sections.slice(i, i + 2));
  }
  return pairs;
}


  ngOnDestroy(): void {
    this.ctx?.revert();
    // Kill all triggers created within this component's context
    try { ScrollTrigger.refresh(); } catch {}
  }
}


