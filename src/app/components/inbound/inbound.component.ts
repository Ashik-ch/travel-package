import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ContactComponent } from '../pages/contact/contact.component';
import { IndiaMapComponent } from './india-map/india-map.component';

@Component({
  selector: 'app-inbound',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ContactComponent,
    IndiaMapComponent
  ],
  templateUrl: './inbound.component.html',
  styleUrl: './inbound.component.css'
})
export class InboundComponent {

  constructor(private router: Router) { }

  states = [
    {
      id: 'kerala',
      name: 'Kerala',
      gradient: 'from-green-400 to-green-600',
      tagline: "God's Own Country",
      description: 'Backwaters, Tea Gardens, Ayurveda',
      bgImage: 'assets/images/l.jpeg'
    },
    {
      id: 'karnataka',
      name: 'Karnataka',
      gradient: 'from-blue-400 to-blue-600',
      tagline: 'One State Many Worlds',
      description: 'Ancient Temples, Coffee Estates, Beaches',
      bgImage: 'assets/images/m.jpeg'
    },
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      gradient: 'from-orange-400 to-orange-600',
      tagline: 'Land of Temples',
      description: 'Dravidian Architecture, Hill Stations',
      bgImage: 'assets/images/k.jpg'
    },
    {
      id: 'goa',
      name: 'Goa',
      gradient: 'from-yellow-400 to-yellow-600',
      tagline: 'Pearl of the Orient',
      description: 'Beaches, Nightlife, Portuguese Heritage',  
    },
    {
      id: 'north-india',
      name: 'North India',
      gradient: 'from-red-400 to-red-600',
      tagline: 'Himalayan Paradise',
      description: 'Mountains, Temples, Heritage Sites', 
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      gradient: 'from-purple-400 to-purple-600',
      tagline: 'Land of Kings',
      description: 'Palaces, Forts, Desert Safaris',
     }
  ];

  packages = [
    {
      id: 'golden-triangle',
      name: 'Golden Triangle',
      gradient: 'from-blue-500 to-blue-600',
      route: 'Delhi - Agra - Jaipur',
      description: 'Experience the rich history and culture of North India'
    },
    {
      id: 'kerala-backwaters',
      name: 'Kerala Backwaters',
      gradient: 'from-green-500 to-green-600',
      route: 'Munnar - Thekkady - Alleppey',
      description: 'Serene backwaters and lush greenery'
    },
    {
      id: 'rajasthan-heritage',
      name: 'Rajasthan Heritage',
      gradient: 'from-purple-500 to-purple-600',
      route: 'Udaipur - Jodhpur - Jaisalmer',
      description: 'Royal palaces and desert adventures'
    }
  ];

  navigateToState(state: string) {
    this.router.navigate(['/inbound', state]);
  }

  openPackage(packageId: string) {
    console.log('Selected package:', packageId);
  }
}
