import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  changeRequest = '';
  isSubmitting = false;
  changeRequestSubmitted = false;

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

}
