import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RentalService} from '../../services/rental.service';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {ToastrService} from 'ngx-toastr';
import {FakeCreditCard} from '../../models/entityModels/fakeCreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userIcon=faUser;
  mailIcon=faEnvelope;
  addressIcon=faAddressCard;
  cityIcon=faCity;
  streetIcon=faRoad;
  masterCardIcon=faCcMastercard;

  totalPrice: number = 0;
  returnDate: Date;
  carId: number;
  year: number;
  month: number;
  day: number;
  rental: RentalDetail = new RentalDetail();
  fakeCreditCard: FakeCreditCard = new FakeCreditCard();
  rentalForm: FormGroup;


  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
  }

  createForm() {
    this.rentalForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  addRental(rental: RentalDetail, fakeCreditCard: FakeCreditCard) {
    this.rentalService.addRental(rental, fakeCreditCard).subscribe(response => {
      this.toastrService.success('Araç kiralandı');
    }, error => {
      if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
        }
      }
    });
  }
}









