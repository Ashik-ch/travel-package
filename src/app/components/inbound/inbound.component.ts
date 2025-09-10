import { Component,   } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { IndiaMapComponent } from '../india-map/india-map.component';

@Component({
  selector: 'app-inbound',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MapComponent,
    ContactComponent,
    IndiaMapComponent
  ],
  templateUrl: './inbound.component.html',
  styleUrl: './inbound.component.css'
})
export class InboundComponent {

  constructor(private router: Router) { }


  navigateToState(state: string) {
    this.router.navigate(['/inbound', state]);
  }
}
