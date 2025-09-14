import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverFxDirective } from 'src/app/directives/hover.directive';
import { Router } from '@angular/router';
import { AdvantagesComponent } from '../pages/advantages/advantages.component';

interface DestinationSection {
  code: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HoverFxDirective, AdvantagesComponent],
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
    { code: 'in', title: 'India', imageUrl: 'assets/images/g.jpg' },
    { code: 'sl', title: 'SreLanka', imageUrl: 'assets/images/h.jpg' }
  ];
  sectionPairs: DestinationSection[][] = [];

  private ctx?: gsap.Context;

  constructor(private zone: NgZone, private router: Router) { }



  ngOnInit() {
    this.sectionPairs = this.chunkArray(this.sections, 4);
  }


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


  private chunkArray(arr: DestinationSection[], size: number): DestinationSection[][] {
    const res: DestinationSection[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  navigate(code: string) {
    console.log("code",code);
    
    this.router.navigateByUrl("outbound/" + code)
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    // Kill all triggers created within this component's context
    try { ScrollTrigger.refresh(); } catch { }
  }
}


