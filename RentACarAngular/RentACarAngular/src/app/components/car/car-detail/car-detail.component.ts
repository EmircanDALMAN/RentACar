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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  userFindeksForm: FormGroup;
  carFindeks: number;
  userFindeks: number;

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
    this.createUserFindeksForm();
  }

  createUserFindeksForm() {
    this.userFindeksForm = this.formBuilder.group({
      tcNo: ['', Validators.required],
      dateYear: ['', Validators.required],
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetails = response.data;
      this.carFindeks = parseInt(this.carDetails[0].findeksScore);
    });
  }

  getUserFindeks() {
    if (this.userFindeksForm.valid) {
      let userFindeksModel = Object.assign({}, this.userFindeksForm.value);
      this.userService.getUserFindeks(userFindeksModel).subscribe(response => {
        this.localStorageService.setItem('userFindeks', response.data.userFindeks.toString());
        this.userFindeks = parseInt(this.localStorageService.getItem('userFindeks'));
        this.toastrService.info('Findeks Hesaplaması Başarılı. Findeks Puanınız: ' + this.userFindeks);
      });
    }
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
      });
      if (this.cartService.list().length > 0) {
        this.router.navigate(['/cart']);
      }
      this.cartService.addToCart(car);
      this.router.navigate(['/cart']);
    }
  }
}

