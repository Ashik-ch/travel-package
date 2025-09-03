import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InboundComponent } from './components/inbound/inbound.component';
import { InboundCategoryComponent } from './components/inbound/inbound-category/inbound-category.component';
import { OutboundComponent } from './components/outbound/outbound.component';
import { OutboundCountryComponent } from './components/outbound/outbound-country.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inbound', component: InboundComponent },
  { path: 'inbound/:state', component: InboundCategoryComponent },
  { path: 'outbound', component: OutboundComponent },
  { path: 'outbound/:country', component: OutboundCountryComponent },
  { path: 'booking', component: BookingComponent },
  { path: '**', redirectTo: '/home' }
];
