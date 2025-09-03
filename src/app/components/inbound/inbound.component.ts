import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import Leaflet types
import * as L from 'leaflet';
import { MapComponent } from '../map/map.component';
import { ContactComponent } from '../pages/contact/contact.component';

interface Region {
  name: string;
  coordinates: L.LatLngTuple[];   // 👈 strong typing for coordinates
  color: string;
  description: string;
}

@Component({
  selector: 'app-inbound',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MapComponent, 
    ContactComponent
  ],
  templateUrl: './inbound.component.html',
  styleUrl: './inbound.component.css'
})


export class InboundComponent implements OnInit, AfterViewInit {
  private map: any;
  private highlightedRegions: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // Load Leaflet CSS
    this.loadLeafletCSS();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private loadLeafletCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }

  private initMap() {
    setTimeout(() => {
      // Initialize map centered on India
      this.map = L.map('indiaMap').setView([23.5937, 78.9629], 5);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Define regions with coordinates and data
      const regions: Region[] = [
        {
          name: 'Kerala',
          coordinates: [[8.0883, 76.2673], [12.9716, 77.5946]],
          color: '#10B981',
          description: 'God\'s Own Country - Backwaters, Tea Gardens, Ayurveda'
        },
        {
          name: 'Karnataka',
          coordinates: [[11.3177, 75.7139], [18.1124, 78.1590]],
          color: '#3B82F6',
          description: 'One State Many Worlds - Temples, Coffee Estates, Beaches'
        },
        {
          name: 'Tamil Nadu',
          coordinates: [[8.0883, 76.2673], [13.0827, 80.2707]],
          color: '#F59E0B',
          description: 'Land of Temples - Dravidian Architecture, Hill Stations'
        },
        {
          name: 'Goa',
          coordinates: [[14.2991, 73.9862], [15.8500, 74.2500]],
          color: '#EAB308',
          description: 'Pearl of the Orient - Beaches, Nightlife, Portuguese Heritage'
        },
        {
          name: 'North India',
          coordinates: [[28.6139, 76.2090], [34.0837, 78.5683]],
          color: '#EF4444',
          description: 'Himalayan Paradise - Mountains, Temples, Heritage Sites'
        },
        {
          name: 'Rajasthan',
          coordinates: [[23.6102, 69.1622], [30.3753, 78.6569]],
          color: '#8B5CF6',
          description: 'Land of Kings - Palaces, Forts, Desert Safaris'
        }
      ];

      // Add regions to map
      regions.forEach(region => {
        const bounds = L.latLngBounds(region.coordinates as L.LatLngTuple[]);
        const rectangle = L.rectangle(bounds, {
          color: region.color,
          weight: 2,
          fillColor: region.color,
          fillOpacity: 0.3
        }).addTo(this.map);

        // Click event → navigate
        rectangle.on('click', () => {
          this.navigateToState(region.name.toLowerCase().replace(/\s+/g, '-'));
        });

        // Popup info
        rectangle.bindPopup(`
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">${region.name}</h3>
            <p class="text-sm">${region.description}</p>
            <p class="text-xs text-gray-500 mt-2">Click to explore packages</p>
          </div>
        `);

        // Save reference for hover highlight
        this.highlightedRegions.push(rectangle);

        // Add region label
        const center = bounds.getCenter();
        L.marker(center, {
          icon: L.divIcon({
            className: 'region-label',
            html: `<div class="bg-white px-2 py-1 rounded text-xs font-semibold shadow-sm">${region.name}</div>`,
            iconSize: [100, 30],
            iconAnchor: [50, 15]
          })
        }).addTo(this.map);
      });

      // Hover effects
      this.highlightedRegions.forEach(rect => {
        rect.on('mouseover', () => {
          rect.setStyle({ fillOpacity: 0.6, weight: 3 });
        });
        rect.on('mouseout', () => {
          rect.setStyle({ fillOpacity: 0.3, weight: 2 });
        });
      });

    }, 500);
  }

  navigateToState(state: string) {
    this.router.navigate(['/inbound', state]);
  }
}
