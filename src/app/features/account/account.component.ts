import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['555-123-4567', Validators.pattern('[0-9-]{10,}')],
      address: ['123 Main St'],
      city: ['New York'],
      state: ['NY'],
      zip: ['10001'],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
      // Here you would typically send the data to a service
    }
  }
}
