import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from 'src/app/services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {RentalService} from '../../../services/rental.service';
import {Rental} from '../../../models/entityModels/rental';
import {Car} from '../../../models/entityModels/car';
import {CartService} from '../../../services/cart.service';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {LocalStorageService} from '../../../services/local-storage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails: Car[];
  faLira = faLiraSign;
  apiUrl = environment.baseUrl;
  rentalDetail: Rental[];
  carFindeks: number;
  brandName:string;
  modelYear:number;
  description:string;
  colorName:string;
  price:number;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
              private cartService: CartService, private rentalService: RentalService,
              private router: Router, private toastrService: ToastrService,
              private userService: UserService, private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
    $('button').click(function(){
      $('button').toggleClass('active');
      $('.title').toggleClass('active');
      $('nav').toggleClass('active');
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetails = response.data;
      this.brandName = response.data[0].brandName;
      this.modelYear = response.data[0].modelYear;
      this.description = response.data[0].description;
      this.price = response.data[0].dailyPrice;
      this.colorName = response.data[0].colorName;
      this.carFindeks = parseInt(this.carDetails[0].findeksScore);
    });
  }


  checkUserFindeks(): boolean {
    var userFindeks = this.localStorageService.getItem('userFindeks');
    if (userFindeks == null) {
      this.toastrService.error('Önce Findeks Hesaplaması Yapılmalıdır.')
      return false;
    }
    else if (parseInt(userFindeks) < this.carFindeks) {
      this.toastrService.error('Findeks Puanınız bu Araç için yetersizdir. ' +
        'Findeks Puanınız: ' + userFindeks + 'Araç için gerekli findeks puanı: ' + this.carFindeks);
      return false;
    } else {
      return true;
    }
  }

  addCart(car: Car) {
    if (this.checkUserFindeks()) {
      this.rentalService.getRentalByCar(car.id).subscribe(response => {
        this.rentalDetail = response.data;
        this.cartService.addToCart(car);
        this.router.navigate(['cart']);
      });
    }
  }
}

