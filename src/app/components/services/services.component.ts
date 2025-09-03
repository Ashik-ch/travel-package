import { NgForOf } from '@angular/common';
import { Component } from '@angular/core'; 
import { OutbondMapComponent } from '../outbound/outbond-map/outbond-map.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgForOf,  OutbondMapComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  features = [
    {
      icon: 'pi pi-home',
      title: 'Luxury Stays',
      desc: 'Experience stylish condos with all the comforts of home.',
    },
    {
      icon: 'pi pi-shop',
      title: 'Gourmet Dining',
      desc: 'Savor local delicacies and world-class café culture.',
    },
    {
      icon: 'pi pi-envelope',
      title: 'Seamless Connectivity',
      desc: 'Stay linked with easy access to transport and networks.',
    },
    {
      icon: 'pi pi-phone',
      title: 'Dedicated Assistance',
      desc: 'Friendly experts available whenever you need guidance.',
    },
  ];
}
