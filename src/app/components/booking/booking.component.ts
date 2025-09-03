import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './booking.component.html',
  styles: []
})
export class BookingComponent {
  bookingForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      packageType: ['', Validators.required],
      destination: ['', Validators.required],
      travelDate: ['', Validators.required],
      duration: ['', Validators.required],
      travelers: ['', [Validators.required, Validators.min(1)]],
      budget: ['', Validators.required],
      requirements: [''],
      contactMethod: ['email']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Booking submitted:', this.bookingForm.value);
        this.isSubmitting = false;

        // Show success message (you can implement a toast notification here)
        alert('Thank you! Your booking request has been submitted successfully. Our travel experts will contact you within 24 hours.');

        // Reset form
        this.bookingForm.reset({
          contactMethod: 'email'
        });
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.bookingForm.controls).forEach(key => {
        const control = this.bookingForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
