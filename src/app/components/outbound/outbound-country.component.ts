import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from '../pages/contact/contact.component';

@Component({
  selector: 'app-outbound-country',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ContactComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <div class="mb-6">
          <a 
            routerLink="/outbound"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Outbound Packages
          </a>
        </div>

        <!-- Country Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ countryName }} Travel Packages
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ countryDescription }}
          </p>
        </div>

        <!-- Today's Deal Banner -->
        <div id="packages" class="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 mb-12 text-white text-center">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-3xl font-bold">Today's Deal!</h2>
          </div>
          <p class="text-xl mb-6">Special discounts on {{ countryName }} packages - Limited time offer!</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              (click)="scrollToPackages()"
              class="bg-white hover:bg-gray-100 text-red-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              View Deals
            </button>
            <a 
              routerLink="/booking"
              class="bg-transparent hover:bg-white hover:text-red-600 border-2 border-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 text-white">
              Book Now
            </a>
          </div>
        </div>

        <!-- Available Packages -->
        <div id="packages" class="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Available Packages</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let package of availablePackages" class="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <!-- Package Image/Icon -->
              <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                <div class="absolute top-3 right-3">
                  <span *ngIf="package.isTodaysDeal" class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    TODAY'S DEAL
                  </span>
                </div>
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span class="text-lg font-semibold">{{ package.duration }}</span>
                </div>
              </div>
              
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ package.name }}</h3>
                <p class="text-gray-600 mb-4">{{ package.description }}</p>
                
                <!-- Package Details -->
                <div class="space-y-3 mb-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ package.destinations }}
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ package.highlights }}
                  </div>
                </div>
                
                <!-- Pricing -->
                <div class="mb-4">
                  <div class="flex items-center space-x-3">
                    <span *ngIf="package.originalPrice && package.originalPrice !== package.price" class="text-lg text-gray-400 line-through">
                      ₹{{ package.originalPrice }}
                    </span>
                    <span class="text-2xl font-bold text-blue-600">₹{{ package.price }}</span>
                    <span *ngIf="package.isTodaysDeal" class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      {{ package.discount }}% OFF
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <button 
                    (click)="showPackageDetails(package)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                  <button 
                    (click)="bookPackage(package)"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold">
                    BOOK IT NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Need a Change Section -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Need a Change in Your Itinerary?
          </h2>
          <p class="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            Tell us what you'd like to modify and we'll create a customized itinerary just for you.
          </p>
          
          <form (ngSubmit)="submitChangeRequest()" class="max-w-2xl mx-auto">
            <div class="mb-6">
              <label for="changeRequest" class="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Changes
              </label>
              <textarea
                id="changeRequest"
                name="changeRequest"
                [(ngModel)]="changeRequest"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Tell us what you'd like to change in your itinerary..."
              ></textarea>
            </div>
            
            <div class="text-center">
              <button
                type="submit"
                [disabled]="!changeRequest || isSubmitting"
                class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                <span *ngIf="!isSubmitting">Submit Change Request</span>
                <span *ngIf="isSubmitting">Processing...</span>
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div *ngIf="changeRequestSubmitted" class="mt-6 text-center">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-green-800 font-medium">
                  Processing… You will receive amended itinerary within 6 hrs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Country Highlights -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Highlights of {{ countryName }}</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let highlight of countryHighlights" class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ highlight.title }}</h3>
              <p class="text-gray-600">{{ highlight.description }}</p>
            </div>
          </div>
        </div>

        <!-- Popular Cities -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Popular Cities in {{ countryName }}</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let city of popularCities" class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-xl">
                <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span class="text-white text-xl font-semibold">{{ city.name }}</span>
                </div>
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"></div>
              </div>
              <div class="mt-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ city.name }}</h3>
                <p class="text-gray-600">{{ city.description }}</p>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {{ city.attractions }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Travel Tips -->
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Travel Tips for {{ countryName }}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Best Time to Visit</h3>
              <p class="text-gray-600">{{ travelTips.bestTime }}</p>
              
              <h3 class="text-lg font-semibold text-gray-900">Visa Requirements</h3>
              <p class="text-gray-600">{{ travelTips.visa }}</p>
              
              <h3 class="text-lg font-semibold text-gray-900">Currency</h3>
              <p class="text-gray-600">{{ travelTips.currency }}</p>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Language</h3>
              <p class="text-gray-600">{{ travelTips.language }}</p>
              
              <h3 class="text-lg font-semibold text-gray-900">Local Customs</h3>
              <p class="text-gray-600">{{ travelTips.customs }}</p>
              
              <h3 class="text-lg font-semibold text-gray-900">Transportation</h3>
              <p class="text-gray-600">{{ travelTips.transportation }}</p>
            </div>
          </div>
        </div>

        <!-- CTA Section 
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">Ready to Explore {{ countryName }}?</h2>
          <p class="text-xl mb-6">Book your perfect {{ countryName }} package today and create unforgettable memories.</p>
          <a 
            routerLink="/booking"
            class="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl inline-block">
            Book Your {{ countryName }} Trip
          </a>
        </div>
        -->
        
        </div>
        </div>
        <app-contact></app-contact>
  `,
  styles: []
})
export class OutboundCountryComponent implements OnInit {
  countryName = '';
  countryDescription = '';
  countryHighlights: any[] = [];
  availablePackages: any[] = [];
  popularCities: any[] = [];
  travelTips: any = {};

  changeRequest = '';
  isSubmitting = false;
  changeRequestSubmitted = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const country = params['country'];
      this.loadCountryData(country);
    });
  }

  loadCountryData(country: string) {
    // Enhanced country data with Today's Deal information
    const countryData: { [key: string]: any } = {
      'uae': {
        name: 'UAE',
        description: 'United Arab Emirates - Experience the perfect blend of tradition and modernity.',
        highlights: [
          { title: 'Modern Cities', description: 'Skyscrapers and architectural marvels' },
          { title: 'Desert Adventures', description: 'Thrilling desert safaris and camping' },
          { title: 'Shopping', description: 'World-class shopping and entertainment' }
        ],
        packages: [
          {
            name: 'Dubai Explorer',
            duration: '5D/4N',
            description: 'Discover the magic of Dubai',
            destinations: 'Dubai, Burj Khalifa, Palm Jumeirah',
            highlights: 'City tours, desert safari, shopping',
            price: '65,000',
            originalPrice: '78,000',
            discount: 17,
            isTodaysDeal: true
          },
          {
            name: 'UAE Complete',
            duration: '7D/6N',
            description: 'Complete UAE experience',
            destinations: 'Dubai, Abu Dhabi, Sharjah',
            highlights: 'Cities, culture, desert, beaches',
            price: '95,000',
            originalPrice: '1,15,000',
            discount: 17,
            isTodaysDeal: false
          },
          {
            name: 'Abu Dhabi Luxury',
            duration: '4D/3N',
            description: 'Luxury Abu Dhabi experience',
            destinations: 'Abu Dhabi, Ferrari World',
            highlights: 'Luxury hotels, theme parks, culture',
            price: '75,000',
            originalPrice: '88,000',
            discount: 15,
            isTodaysDeal: true
          }
        ],
        cities: [
          { name: 'Dubai', description: 'Modern metropolis with iconic landmarks', attractions: 'Burj Khalifa, Palm Jumeirah, Dubai Mall' },
          { name: 'Abu Dhabi', description: 'Capital city with cultural heritage', attractions: 'Sheikh Zayed Mosque, Louvre Abu Dhabi' },
          { name: 'Sharjah', description: 'Cultural capital of UAE', attractions: 'Heritage Area, Museums, Beaches' }
        ],
        travelTips: {
          bestTime: 'November to March (pleasant weather)',
          visa: 'Visa on arrival for Indian citizens (14 days)',
          currency: 'UAE Dirham (AED)',
          language: 'Arabic (English widely spoken)',
          customs: 'Modest dress, respect for local traditions',
          transportation: 'Metro, taxis, ride-sharing apps'
        }
      },
      'thailand': {
        name: 'Thailand',
        description: 'Land of Smiles - Experience the perfect blend of culture, beaches, and adventure.',
        highlights: [
          { title: 'Beaches', description: 'Pristine beaches and crystal clear waters' },
          { title: 'Culture', description: 'Rich Buddhist temples and traditions' },
          { title: 'Food', description: 'World-famous Thai cuisine and street food' }
        ],
        packages: [
          {
            name: 'Bangkok & Pattaya',
            duration: '5D/4N',
            description: 'City life and beach relaxation',
            destinations: 'Bangkok, Pattaya',
            highlights: 'Temples, beaches, nightlife',
            price: '45,000',
            originalPrice: '55,000',
            discount: 18,
            isTodaysDeal: true
          },
          {
            name: 'Phuket Paradise',
            duration: '6D/5N',
            description: 'Island hopping and beach activities',
            destinations: 'Phuket, Phi Phi Islands',
            highlights: 'Beaches, water sports, island tours',
            price: '55,000',
            originalPrice: '68,000',
            discount: 19,
            isTodaysDeal: false
          },
          {
            name: 'Thailand Complete',
            duration: '8D/7N',
            description: 'Complete Thailand experience',
            destinations: 'Bangkok, Chiang Mai, Phuket',
            highlights: 'Cities, mountains, beaches',
            price: '75,000',
            originalPrice: '92,000',
            discount: 18,
            isTodaysDeal: true
          }
        ],
        cities: [
          { name: 'Bangkok', description: 'Vibrant capital with temples and markets', attractions: 'Grand Palace, Wat Phra Kaew, Chatuchak Market' },
          { name: 'Phuket', description: 'Famous beach destination', attractions: 'Patong Beach, Big Buddha, Phi Phi Islands' },
          { name: 'Chiang Mai', description: 'Cultural hub in the mountains', attractions: 'Old City, Doi Suthep, Night Bazaar' }
        ],
        travelTips: {
          bestTime: 'November to April (dry season)',
          visa: 'Visa on arrival for Indian citizens (15 days)',
          currency: 'Thai Baht (THB)',
          language: 'Thai (English widely spoken in tourist areas)',
          customs: 'Respect for monarchy, modest dress at temples',
          transportation: 'Tuk-tuks, taxis, BTS Skytrain in Bangkok'
        }
      },
      'usa': {
        name: 'USA',
        description: 'United States of America - Land of opportunity and diverse experiences.',
        highlights: [
          { title: 'Cities', description: 'Iconic cities and urban experiences' },
          { title: 'Nature', description: 'National parks and natural wonders' },
          { title: 'Culture', description: 'Diverse cultures and entertainment' }
        ],
        packages: [
          {
            name: 'East Coast Explorer',
            duration: '10D/9N',
            description: 'Historic East Coast cities',
            destinations: 'New York, Washington DC, Boston',
            highlights: 'City tours, museums, history',
            price: '1,85,000',
            originalPrice: '2,15,000',
            discount: 14,
            isTodaysDeal: true
          },
          {
            name: 'West Coast Adventure',
            duration: '12D/11N',
            description: 'California and West Coast',
            destinations: 'Los Angeles, San Francisco, Las Vegas',
            highlights: 'Beaches, cities, entertainment',
            price: '2,15,000',
            originalPrice: '2,45,000',
            discount: 12,
            isTodaysDeal: false
          },
          {
            name: 'USA Coast to Coast',
            duration: '15D/14N',
            description: 'Complete USA experience',
            destinations: 'New York, Chicago, Las Vegas, LA',
            highlights: 'Cities, culture, entertainment, nature',
            price: '2,85,000',
            originalPrice: '3,25,000',
            discount: 12,
            isTodaysDeal: true
          }
        ],
        cities: [
          { name: 'New York', description: 'The city that never sleeps', attractions: 'Times Square, Statue of Liberty, Central Park' },
          { name: 'Los Angeles', description: 'Entertainment capital of the world', attractions: 'Hollywood, Beverly Hills, Santa Monica' },
          { name: 'Las Vegas', description: 'Entertainment and nightlife hub', attractions: 'The Strip, Casinos, Shows' }
        ],
        travelTips: {
          bestTime: 'March to May and September to November',
          visa: 'B1/B2 tourist visa required for Indian citizens',
          currency: 'US Dollar (USD)',
          language: 'English (Spanish widely spoken in some areas)',
          customs: 'Tipping culture, friendly people, diverse society',
          transportation: 'Rental cars, public transit, ride-sharing'
        }
      }
    };

    const data = countryData[country] || countryData['thailand'];
    this.countryName = data.name;
    this.countryDescription = data.description;
    this.countryHighlights = data.highlights;
    this.availablePackages = data.packages;
    this.popularCities = data.cities;
    this.travelTips = data.travelTips;
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

  submitChangeRequest() {
    if (!this.changeRequest.trim()) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.changeRequestSubmitted = true;
      this.changeRequest = '';

      // Hide success message after 10 seconds
      setTimeout(() => {
        this.changeRequestSubmitted = false;
      }, 10000);
    }, 2000);
  }

  scrollToPackages() {
    const packagesElement = document.getElementById('packages');
    if (packagesElement) {
      packagesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
