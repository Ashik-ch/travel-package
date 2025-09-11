import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OutbondMapComponent } from './outbond-map/outbond-map.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { ContactComponent } from '../pages/contact/contact.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-outbound',
  standalone: true,
  imports: [CommonModule, RouterModule,
     OutbondMapComponent, WorldMapComponent, ContactComponent],
  templateUrl: './outbond.component.html',
})
export class OutboundComponent implements AfterViewInit {
  constructor(private router: Router) { }

  @ViewChildren('countryCard') countryCards!: QueryList<ElementRef>;

  countries = [
    { code: 'uae', title: 'UAE', subtitle: 'United Arab Emirates', desc: 'Dubai, Abu Dhabi, Modern Marvels', image: 'assets/images/a.jpg' },
    { code: 'saudi-arabia', title: 'Saudi Arabia', subtitle: 'Kingdom of Saudi Arabia', desc: 'Mecca, Medina, Riyadh', image: 'assets/images/e.jpg' },
    { code: 'qatar', title: 'Qatar', subtitle: 'Pearl of the Gulf', desc: 'Doha, Desert Adventures', image: 'assets/images/c.jpg' },
    { code: 'oman', title: 'Oman', subtitle: 'Sultanate of Oman', desc: 'Muscat, Mountains, Deserts', image: 'assets/images/e.jpg' },
    { code: 'maldives', title: 'Maldives', subtitle: 'Island Paradise', desc: 'Overwater Villas, Beaches', image: 'assets/images/g.jpg' },
    { code: 'thailand', title: 'Thailand', subtitle: 'Land of Smiles', desc: 'Bangkok, Phuket, Culture', image: 'assets/images/c.jpg' },
    { code: 'singapore', title: 'Singapore', subtitle: 'Lion City', desc: 'Marina Bay, Gardens, Shopping', image: 'assets/images/e.jpg' },
    { code: 'malaysia', title: 'Malaysia', subtitle: 'Truly Asia', desc: 'Kuala Lumpur, Langkawi', image: 'assets/images/c.jpg' },
    { code: 'indonesia', title: 'Indonesia', subtitle: 'Emerald of the Equator', desc: 'Bali, Jakarta, Komodo', image: 'assets/images/g.jpg' },
    { code: 'sri-lanka', title: 'Sri Lanka', subtitle: 'Pearl of the Indian Ocean', desc: 'Colombo, Kandy, Beaches', image: 'assets/images/b.jpg' },
    { code: 'nepal', title: 'Nepal', subtitle: 'Land of Himalayas', desc: 'Kathmandu, Everest, Temples', image: 'assets/images/f.jpg' },
    { code: 'bhutan', title: 'Bhutan', subtitle: 'Land of Thunder Dragon', desc: 'Thimphu, Paro, Happiness', image: 'assets/images/f.jpg' },
    { code: 'uk', title: 'UK', subtitle: 'United Kingdom', desc: 'London, Edinburgh, History', image: 'assets/images/c.jpg' },
    { code: 'europe', title: 'Europe', subtitle: 'European Union', desc: 'France, Italy, Germany, Spain', image: 'assets/images/a.jpg' },
    { code: 'usa', title: 'USA', subtitle: 'United States of America', desc: 'New York, LA, Las Vegas', image: 'assets/images/b.jpg' }
  ];

  navigateToCountry(country: string) {
    this.router.navigate(['/outbound', country]);
  }

  ngAfterViewInit(): void {
    this.onScrollAnimation()
  }

  onScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    // Animate cards only when they scroll into view
    gsap.from(this.countryCards.map(c => c.nativeElement), {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.grid',
        start: 'top 80%',
        toggleActions: 'play none none reset',
      }
    });

    // Hover scaling (same as before)
    this.countryCards.forEach((card) => {
      const el = card.nativeElement;
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }
}
