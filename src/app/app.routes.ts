import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InboundComponent } from './components/inbound/inbound.component';
import { InboundCategoryComponent } from './components/inbound/inbound-category/inbound-category.component';
import { OutboundComponent } from './components/outbound/outbound.component';
import { OutboundCountryComponent } from './components/outbound/outbond-category/outbond-category.component';
import { BookingComponent } from './components/booking/booking.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ExplorerComponent } from './components/explorer/explorer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inbound', component: InboundComponent },
  { path: 'inbound/:state', component: InboundCategoryComponent },
  { path: 'outbound', component: OutboundComponent },
  { path: 'outbound/:country', component: OutboundCountryComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: '**', redirectTo: '/home' }
];
