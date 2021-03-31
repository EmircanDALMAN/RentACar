import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../../models/entityModels/car';
import {environment} from '../../../../environments/environment';
import {CarService} from '../../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {BrandService} from '../../../services/brand.service';
import {ColorService} from '../../../services/color.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerDetail} from '../../../models/entityModels/customerDetail';
import {CustomerService} from '../../../services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerUpdateForm: FormGroup;
  customer: CustomerDetail;

  constructor(private formBuilder: FormBuilder,
              private customerService:CustomerService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private colorService: ColorService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['customer']) {
        this.customer = JSON.parse(params['customer']);
      }
    });
    this.createCustomerUpdateForm();
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      id: [this.customer.id],
      userId: [this.customer.userId],
      companyName: [this.customer.companyName, Validators.required],
    });
  }

  updateCustomer() {
    if (this.customerUpdateForm.valid){
      let customerModel = Object.assign({}, this.customerUpdateForm.value);
      this.customerService.updateCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(['/authorized/customers/list']);
      }, error => {
        if (error.error.Errors.length > 0) {
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik!', 'Hata');
    }
  }
}
