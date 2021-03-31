import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../services/user.service';
import {CustomerService} from '../../../services/customer.service';
import {User} from '../../../models/entityModels/user';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerAddForm: FormGroup;
  users: User[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.createCustomerAddForm();
    this.getUsers();
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    });
  }

  addCustomer() {
    let customerModel = Object.assign({}, this.customerAddForm.value);
    this.customerService.addCustomer(customerModel).subscribe(response => {
      this.toastrService.info(response.message);
    }, error => {
      if (error.error.message != null) {
        this.toastrService.error(error.error.message);
      }
      else if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
        }
      }
    });
  }
}
