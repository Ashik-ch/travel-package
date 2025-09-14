import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverFxDirective } from '../../directives/hover.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServicesComponent } from '../services/services.component';
import { SubscriptionComponent } from '../pages/subscription/subscription.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { AdvantagesComponent } from '../pages/advantages/advantages.component';

interface Feature {
  iconBg: string;
  iconColor: string;
  iconPath: string;
  innerIcon?: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    ServicesComponent,
    SubscriptionComponent,
    ContactComponent,
    HoverFxDirective,
    AdvantagesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'

})
export class HomeComponent implements AfterViewInit {
  features: Feature[] = [
    {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      iconPath:
        'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      innerIcon: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Curated Destinations',
      description: 'Handpicked locations and experiences for unforgettable memories.'
    },
    {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      iconPath:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      title: 'Best Prices',
      description: 'Competitive rates and exclusive deals for every budget.'
    },
    {
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      iconPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Safe Travel',
      description: 'Your safety and comfort are our top priorities.'
    },
    {
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      iconPath:
        'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z',
      title: '24/7 Support',
      description: 'Round-the-clock assistance for worry-free travel.'
    }
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.animateFeatureCards();
    this.buttonAnimation()
  }


  private buttonAnimation() {
    const buttons = document.querySelectorAll<HTMLElement>('.fancy-btn');
    buttons.forEach(btn => {
      const bg = btn.querySelector<HTMLElement>('.bg');
      let tl = gsap.timeline({ paused: true });

      // Expand background
      tl.to(bg, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Reset on leave
      btn.addEventListener("mouseenter", (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.set(bg, {
          top: y + "px",
          left: x + "px",
          xPercent: -50,
          yPercent: -50,
          scale: 0
        });

        tl.play(0);
        btn.style.color = "white";
      });

      btn.addEventListener("mouseleave", () => {
        tl.reverse();
        btn.style.color = "rgb(37 99 235 / var(--tw-bg-opacity, 1))";
      });
    });
  }

  private animateFeatureCards() {
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');

    // Initial state
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

    cards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Hover animation
      const tl = gsap.timeline({ paused: true })
        .to(card, { scale: 1.05, rotation: 3, duration: 0.2, ease: 'power1.out' });

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });
  }
}
