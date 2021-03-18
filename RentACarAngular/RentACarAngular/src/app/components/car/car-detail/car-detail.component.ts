import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarService} from 'src/app/services/car.service';
import {Car} from '../../../models/entityModels/car';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../services/cart.service';
import {RentalService} from '../../../services/rental.service';
import {Rental} from '../../../models/entityModels/rental';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails: Car[];
  //carImages:CarImage[]=[];
  faLira = faLiraSign;
  rentalDetail: Rental[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private rentalService: RentalService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
  }

  addToCart(car: Car) {
    this.rentalService.getRentalByCar(car.id).subscribe(response => {
      this.rentalDetail = response.data;
      console.log(this.rentalDetail[this.getCarRentalDetail()].returnDate);
      console.log(Date)
    });
      this.cartService.addToCart(car);
  }

  getCarRentalDetail() {
    return this.rentalDetail.length - 1;
  }

  getRentals(id: number) {
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetails = response.data;
    });
  }
}
