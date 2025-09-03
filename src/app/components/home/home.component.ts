import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from '../services/services.component';
import { SubscriptionComponent } from '../pages/subscription/subscription.component';
import { ContactComponent } from '../pages/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ServicesComponent,
    SubscriptionComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',

  styles: []
})
export class HomeComponent {


}
