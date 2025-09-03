import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OutbondMapComponent } from './outbond-map/outbond-map.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { ContactComponent } from '../pages/contact/contact.component';

@Component({
  selector: 'app-outbound',
  standalone: true,
  imports: [CommonModule, RouterModule, OutbondMapComponent, WorldMapComponent, ContactComponent],
  templateUrl: './outbond.component.html',
})
export class OutboundComponent {
  constructor(private router: Router) { }

  countries = [
    {
      code: 'uae',
      title: 'UAE',
      subtitle: 'United Arab Emirates',
      desc: 'Dubai, Abu Dhabi, Modern Marvels',
      image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945' // Dubai skyline
    },
    {
      code: 'saudi-arabia',
      title: 'Saudi Arabia',
      subtitle: 'Kingdom of Saudi Arabia',
      desc: 'Mecca, Medina, Riyadh',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee' // Riyadh skyline
    },
    {
      code: 'qatar',
      title: 'Qatar',
      subtitle: 'Pearl of the Gulf',
      desc: 'Doha, Desert Adventures',
      image: 'https://images.unsplash.com/photo-1614852206803-5a9e6c4a5a89' // Doha city
    },
    {
      code: 'oman',
      title: 'Oman',
      subtitle: 'Sultanate of Oman',
      desc: 'Muscat, Mountains, Deserts',
      image: 'https://images.unsplash.com/photo-1602664546586-7b7e5a45fcdd' // Oman mountains
    },
    {
      code: 'maldives',
      title: 'Maldives',
      subtitle: 'Island Paradise',
      desc: 'Overwater Villas, Beaches',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' // Maldives beach
    },
    {
      code: 'thailand',
      title: 'Thailand',
      subtitle: 'Land of Smiles',
      desc: 'Bangkok, Phuket, Culture',
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03' // Thailand temples
    },
    {
      code: 'singapore',
      title: 'Singapore',
      subtitle: 'Lion City',
      desc: 'Marina Bay, Gardens, Shopping',
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' // Marina Bay Sands
    },
    {
      code: 'malaysia',
      title: 'Malaysia',
      subtitle: 'Truly Asia',
      desc: 'Kuala Lumpur, Langkawi',
      image: 'https://images.unsplash.com/photo-1526481280691-9061a50ed36e' // Petronas towers
    },
    {
      code: 'indonesia',
      title: 'Indonesia',
      subtitle: 'Emerald of the Equator',
      desc: 'Bali, Jakarta, Komodo',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' // Bali rice fields
    },
    {
      code: 'sri-lanka',
      title: 'Sri Lanka',
      subtitle: 'Pearl of the Indian Ocean',
      desc: 'Colombo, Kandy, Beaches',
      image: 'https://images.unsplash.com/photo-1600696791950-fb5c582f5c6c' // Sri Lanka train
    },
    {
      code: 'nepal',
      title: 'Nepal',
      subtitle: 'Land of Himalayas',
      desc: 'Kathmandu, Everest, Temples',
      image: 'https://images.unsplash.com/photo-1549887534-3db1bd59dcca' // Himalayas
    },
    {
      code: 'bhutan',
      title: 'Bhutan',
      subtitle: 'Land of Thunder Dragon',
      desc: 'Thimphu, Paro, Happiness',
      image: 'https://images.unsplash.com/photo-1589308078053-f3c54e5b1a3e' // Tiger's Nest monastery
    },
    {
      code: 'uk',
      title: 'UK',
      subtitle: 'United Kingdom',
      desc: 'London, Edinburgh, History',
      image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad' // Big Ben London
    },
    {
      code: 'europe',
      title: 'Europe',
      subtitle: 'European Union',
      desc: 'France, Italy, Germany, Spain',
      image: 'https://www.focus-info.org/wp-content/uploads/2022/07/london-blog-1.jpg'
    },
    {
      code: 'usa',
      title: 'USA',
      subtitle: 'United States of America',
      desc: 'New York, LA, Las Vegas',
      image: 'https://resources.sotc.in/images/holidays/PKG005836/New%20York,%20America.jpg'
    }
  ]

  navigateToCountry(country: string) {
    this.router.navigate(['/outbound', country]);
  }
}
