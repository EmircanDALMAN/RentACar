import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {ToastrService} from 'ngx-toastr';
import {CustomerDetail} from '../../../models/entityModels/customerDetail';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  customers: CustomerDetail[] = [];
  dataLoaded = false;
  error = '';
  removedCustomer: CustomerDetail;

  constructor(private customerService: CustomerService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCustomerDetails();
  }

  setSelectedCustomer(customer: CustomerDetail) {
    this.removedCustomer = customer;
  }

  goEdit(customer:CustomerDetail) {
    this.router.navigate(['/authorized/customers/update/',JSON.stringify(customer)]);
  }

  removeCustomer() {
    this.customerService.removeCustomer(this.removedCustomer.id).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomersDetails().subscribe(response => {
      this.customers = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    });
  }
}
