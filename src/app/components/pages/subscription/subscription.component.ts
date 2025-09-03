import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  subscriptionData = {
    email: '',
    phone: ''
  };

  isSubmitting = false;
  message = '';
  isSuccess = false;

  constructor(private userService: UserService, private http: HttpClient) { }

  onSubscribe() {
    if (!this.subscriptionData.email) {
      this.showMessage('Please enter a valid email address.', false);
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    // Send subscription data to /api/users/subscribe
    this.http.post('/api/users/subscribe', this.subscriptionData)
      .subscribe({
        next: (response) => {
          this.showMessage('Thank you for subscribing! You\'ll receive updates about our latest travel packages.', true);
          this.subscriptionData = { email: '', phone: '' };
        },
        error: (error) => {
          console.error('Subscription error:', error);
          this.showMessage('Sorry, there was an error processing your subscription. Please try again.', false);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  private showMessage(message: string, isSuccess: boolean) {
    this.message = message;
    this.isSuccess = isSuccess;

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }


}
