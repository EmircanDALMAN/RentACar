import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RentalService} from '../../services/rental.service';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.totalPrice = params['totalPrice'];
      this.carId = params['id'];
      this.year = params['year'];
      this.month = params['month'];
      this.day = params['day'];
      this.rental.carId = this.carId;
      this.rental.customerId = 1;
      this.rental.returnDate = new Date(params['year'], params['month'], params['day']);
    });
  }

  addRental(rental: RentalDetail) {
    this.rentalService.addRental(rental);
    this.toastrService.success('Araç kiralandı');
  }
}










