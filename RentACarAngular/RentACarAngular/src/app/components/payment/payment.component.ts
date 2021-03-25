import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RentalService} from '../../services/rental.service';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {ToastrService} from 'ngx-toastr';
import {FakeCreditCard} from '../../models/entityModels/fakeCreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userIcon = faUser;
  mailIcon = faEnvelope;
  addressIcon = faAddressCard;
  cityIcon = faCity;
  streetIcon = faRoad;
  masterCardIcon = faCcMastercard;

  totalPrice: number = 0;
  returnDate: Date;
  carId: number;
  year: number;
  month: number;
  day: number;
  rental: RentalDetail = new RentalDetail();
  fakeCreditCard: FakeCreditCard = new FakeCreditCard();
  rentalForm: FormGroup;
  cardName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
    var cardHolderName = this.localStorageService.getItem('cardHolderName');
    var expirationYear = this.localStorageService.getItem('expirationYear');
    var expirationMonth = this.localStorageService.getItem('expirationMonth');
    var cardNumber = this.localStorageService.getItem('cardNumber');
    var cvv = this.localStorageService.getItem('cvv');
    if (cardHolderName != null && expirationMonth != null && expirationYear != null && cardNumber != null && cvv != null) {
      this.fakeCreditCard.cardHolderName = cardHolderName;
      this.fakeCreditCard.expirationYear = parseInt(expirationYear);
      this.fakeCreditCard.expirationMonth = parseInt(expirationMonth);
      this.fakeCreditCard.cardNumber = cardNumber;
      this.fakeCreditCard.cvv = cvv;
    }
    this.createForm();
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
    let element = <HTMLInputElement> document.getElementById('saveCreditCard');
    if (element.checked == true) {
      this.localStorageService.setItem('cardHolderName', fakeCreditCard.cardHolderName);
      this.localStorageService.setItem('expirationMonth', fakeCreditCard.expirationMonth.toString());
      this.localStorageService.setItem('expirationYear', fakeCreditCard.expirationYear.toString());
      this.localStorageService.setItem('cardNumber', fakeCreditCard.cardNumber.toString());
      this.localStorageService.setItem('cvv', fakeCreditCard.cvv);
    }
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
