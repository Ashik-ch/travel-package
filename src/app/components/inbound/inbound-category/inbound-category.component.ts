import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from '../../pages/contact/contact.component';
import { FeedbackComponent } from '../../pages/feedback/feedback.component';

// Import Leaflet types
declare var L: any;


@Component({
  selector: 'app-inbound-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContactComponent, FeedbackComponent,
    FormsModule],
  templateUrl: './inbound-category.component.html',
  styleUrl: './inbound-category.component.css'
})
export class InboundCategoryComponent implements OnInit, AfterViewInit {
  stateName = '';
  stateDescription = '';
  stateHighlights: any[] = [];
  availablePackages: any[] = [];
  popularDestinations: any[] = [];
  bestTimeToVisit: any[] = [];
  private map: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadLeafletCSS();
    this.route.params.subscribe(params => {
      const state = params['state'];
      this.loadStateData(state);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initStateMap();
    }, 1000);
  }

  private loadLeafletCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }

  private initStateMap() {
    if (!this.map) {
      // Initialize map centered on the state
      const stateCenter = this.getStateCenter();
      this.map = L.map('stateMap').setView(stateCenter, 8);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add package location pins
      this.addPackagePins();
    }
  }

  private getStateCenter(): [number, number] {
    const stateCenters: { [key: string]: [number, number] } = {
      'kerala': [10.8505, 76.2711],
      'karnataka': [15.3173, 75.7139],
      'tamil-nadu': [11.1271, 78.6569],
      'goa': [15.2993, 74.1240],
      'rajasthan': [27.0238, 74.2179],
      'north-india': [31.1048, 77.1734]
    };

    return stateCenters[this.stateName.toLowerCase().replace(' ', '-')] || [23.5937, 78.9629];
  }

  private addPackagePins() {
    this.availablePackages.forEach((pkg, index) => {
      const location = this.getPackageLocation(index);
      const iconColor = pkg.isTodaysDeal ? '#10B981' : '#3B82F6';

      const marker = L.marker(location, {
        icon: L.divIcon({
          className: 'package-marker',
          html: `<div class="w-6 h-6 bg-${pkg.isTodaysDeal ? 'green' : 'blue'}-500 rounded-full border-2 border-white shadow-lg"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(this.map);

      // Add popup with package info
      marker.bindPopup(`
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">${pkg.name}</h3>
            <p class="text-sm mb-2">${pkg.duration}</p>
            <p class="text-lg font-bold text-blue-600">₹${pkg.price}</p>
            ${pkg.isTodaysDeal ? '<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">TODAY\'S DEAL</span>' : ''}
          </div>
        `);

      // Add click event to navigate to package details
      marker.on('click', () => {
        this.showPackageDetails(pkg);
      });
    });
  }

  private getPackageLocation(index: number): [number, number] {
    const stateCenter = this.getStateCenter();
    const offset = 0.1;

    // Create a grid pattern around the center
    const row = Math.floor(index / 3);
    const col = index % 3;

    return [
      stateCenter[0] + (row - 1) * offset,
      stateCenter[1] + (col - 1) * offset
    ];
  }

  loadStateData(state: string) {
    // Enhanced state data with Today's Deal information
    const stateData: { [key: string]: any } = {
      'kerala': {
        name: 'Kerala',
        description:
          "God's Own Country - Experience the serene backwaters, lush tea gardens, and pristine beaches.",
        highlights: [
          {
            title: 'Backwaters',
            description: 'Peaceful houseboat cruises through serene waterways',
            img: 'assets/images/h.jpg',
          },
          {
            title: 'Tea Gardens',
            description: 'Visit the famous tea estates of Munnar',
            img: 'assets/images/i.jpg',
          },
          {
            title: 'Ayurveda',
            description: 'Traditional wellness treatments and therapies',
            img: 'assets/images/h.jpg',
          },
          {
            title: 'Hill Areas',
            description: 'Explore the misty mountains and trekking trails',
            img: 'assets/images/i.jpg',
          },
          {
            title: 'Beaches',
            description: 'Relax on pristine golden beaches like Kovalam & Varkala',
            img: 'assets/images/j.jpg',
          },
          {
            title: 'Historical Sites',
            description: 'Discover forts, palaces, and ancient temples',
            img: 'assets/images/i.jpg',
          },
        ],
        packages: [
          {
            name: 'Kerala Backwaters',
            duration: '5D/4N',
            description: 'Experience the serene backwaters of Alleppey',
            price: '25,000',
            originalPrice: '32,000',
            discount: 22,
            isTodaysDeal: true
          },
          {
            name: 'Munnar Tea Trail',
            duration: '4D/3N',
            description: 'Explore the tea gardens and hill stations',
            price: '20,000',
            originalPrice: '25,000',
            discount: 20,
            isTodaysDeal: false
          },
          {
            name: 'Kerala Complete',
            duration: '7D/6N',
            description: 'Complete Kerala experience from mountains to beaches',
            price: '35,000',
            originalPrice: '42,000',
            discount: 17,
            isTodaysDeal: true
          }
        ],
        destinations: [
          { name: 'Alleppey', description: 'Famous for its backwaters and houseboats' },
          { name: 'Munnar', description: 'Hill station known for tea gardens and scenic beauty' },
          { name: 'Kovalam', description: 'Beautiful beach destination with golden sands' }
        ],
        bestTime: [
          { name: 'Winter', months: 'Dec-Feb', description: 'Pleasant weather, perfect for sightseeing', color: 'bg-blue-500' },
          { name: 'Monsoon', months: 'Jun-Sep', description: 'Lush greenery, backwater cruises', color: 'bg-green-500' },
          { name: 'Spring', months: 'Mar-May', description: 'Hot but good for beach activities', color: 'bg-yellow-500' },
          { name: 'Autumn', months: 'Oct-Nov', description: 'Mild weather, great for outdoor activities', color: 'bg-orange-500' }
        ]
      },
      'rajasthan': {
        name: 'Rajasthan',
        description: 'Land of Kings - Discover royal palaces, desert adventures, and rich cultural heritage.',
        highlights: [
          { title: 'Royal Palaces', description: 'Magnificent forts and palaces of the Rajput era' },
          { title: 'Desert Safari', description: 'Thrilling camel safaris in the Thar Desert' },
          { title: 'Cultural Heritage', description: 'Rich traditions, folk music, and colorful festivals' }
        ],
        packages: [
          {
            name: 'Golden Triangle',
            duration: '6D/5N',
            description: 'Delhi - Agra - Jaipur classic tour',
            price: '30,000',
            originalPrice: '38,000',
            discount: 21,
            isTodaysDeal: true
          },
          {
            name: 'Rajasthan Heritage',
            duration: '8D/7N',
            description: 'Complete Rajasthan experience',
            price: '45,000',
            originalPrice: '52,000',
            discount: 13,
            isTodaysDeal: false
          },
          {
            name: 'Desert Adventure',
            duration: '5D/4N',
            description: 'Jaisalmer desert safari and forts',
            price: '28,000',
            originalPrice: '35,000',
            discount: 20,
            isTodaysDeal: true
          }
        ],
        destinations: [
          { name: 'Jaipur', description: 'Pink City with magnificent palaces and forts' },
          { name: 'Udaipur', description: 'City of Lakes with romantic boat rides' },
          { name: 'Jaisalmer', description: 'Golden City in the heart of Thar Desert' }
        ],
        bestTime: [
          { name: 'Winter', months: 'Oct-Mar', description: 'Best time to visit, pleasant weather', color: 'bg-blue-500' },
          { name: 'Spring', months: 'Mar-May', description: 'Hot weather, good for early morning tours', color: 'bg-yellow-500' },
          { name: 'Monsoon', months: 'Jul-Sep', description: 'Moderate rainfall, lush landscapes', color: 'bg-green-500' },
          { name: 'Summer', months: 'May-Jun', description: 'Very hot, indoor activities recommended', color: 'bg-red-500' }
        ]
      }
    };

    const data = stateData[state] || stateData['kerala'];
    this.stateName = data.name;
    this.stateDescription = data.description;
    this.stateHighlights = data.highlights;
    this.availablePackages = data.packages;
    this.popularDestinations = data.destinations;
    this.bestTimeToVisit = data.bestTime;
  }

  showPackageDetails(pkg: any) {
    // This would typically open a modal or navigate to package details
    console.log('Package details:', pkg);
    alert(`Package: ${pkg.name}\nDuration: ${pkg.duration}\nPrice: ₹${pkg.price}`);
  }

  bookPackage(pkg: any) {
    // Navigate to booking page with package details
    this.router.navigate(['/booking'], {
      queryParams: {
        package: pkg.name,
        price: pkg.price,
        duration: pkg.duration
      }
    });
  }

  scrollToPackages() {
    const packagesElement = document.getElementById('packages');
    if (packagesElement) {
      packagesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

