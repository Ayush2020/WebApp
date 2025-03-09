import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  providers: [AddressService],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Output() formClose = new EventEmitter();
  addressForm: FormGroup;
  addressService = inject(AddressService);

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  submitForm() {
    if (this.addressForm.valid) {
      const newAddress: Address = this.addressForm.value; // Explicitly type it
      this.addressService.addAddress(newAddress).subscribe(() => {
        this.formClose.emit();
      });
    }
  }

  closeForm() {
    this.formClose.emit();
  }
}
