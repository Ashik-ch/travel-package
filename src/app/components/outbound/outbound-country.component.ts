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
  templateUrl: './outbondCountry.component.html',
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
