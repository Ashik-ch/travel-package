import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
           <!-- Logo and Tagline -->
           <a routerLink="/home">
            <div class="flex items-center space-x-3 mb-4 md:mb-0">
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div> 
                <h1 class="text-2xl font-bold text-gray-900 m-0">TravelPacks</h1>
                <p class="text-sm text-gray-600 m-0">Your Journey, Our Expertise</p>
              </div>
              </div> 
            </a>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <a 
              routerLink="/home" 
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Home
            </a>
            <a 
              routerLink="/inbound" 
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Inbound Packages
            </a>
            <a 
              routerLink="/outbound" 
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Outbound Packages
            </a>
            <!--  <button 
               routerLink="/booking"
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
               Book Now
             </button>  -->
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              (click)="toggleMobileMenu()"
              class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div *ngIf="isMobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a 
              routerLink="/home" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Home
            </a>
            <a 
              routerLink="/inbound" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Inbound Packages
            </a>
            <a 
              routerLink="/outbound" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Outbound Packages
            </a>
          <!--  <a 
              routerLink="/booking"
              class="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Book Now
            </a>  -->
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
