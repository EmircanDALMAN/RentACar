import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RentalService} from '../../services/rental.service';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {ToastrService} from 'ngx-toastr';
import {FakeCreditCard} from '../../models/entityModels/fakeCreditCard';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  totalPrice: number = 0;
  returnDate: Date;
  carId: number;
  year: number;
  month: number;
  day: number;
  rental: RentalDetail = new RentalDetail();
  fakeCreditCard: FakeCreditCard = new class implements FakeCreditCard {
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expirationMonth: number;
    expirationYear: number;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if(params["myrental"]){
        this.rental = JSON.parse(params['myrental']);
      }
    });
  }

  addRental(rental: RentalDetail,fakeCreditCard:FakeCreditCard) {
    this.rentalService.addRental(rental, fakeCreditCard).subscribe(response=>{
      this.toastrService.success(response.message.toString());
    });
    this.toastrService.success('Araç kiralandı');
  }
}









