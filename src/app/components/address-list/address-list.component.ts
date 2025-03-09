import { Component, OnInit } from '@angular/core';
import { AddressService } from 'D:/IntelliC/Application/MyApp/myApp/src/app/services';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  deleteAddress(id: number) {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe(() => {
        this.loadAddresses();
      });
    }
  }
}
