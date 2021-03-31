import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {BrandService} from '../../../services/brand.service';
import {ColorService} from '../../../services/color.service';
import {Brand} from '../../../models/entityModels/brand';
import {Color} from '../../../models/entityModels/color';
import {Car} from '../../../models/entityModels/car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  car: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  cars: Car[] = [];
  sendCarId: number;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private colorService: ColorService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createCarAddForm();
    this.brandList();
    this.colorList();
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findeksScore: ['', Validators.required],
    });
  }

  brandList() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  colorList() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  addCar() {
    let carModel = Object.assign({}, this.carAddForm.value);
    this.carService.addCar(carModel).subscribe(response => {
      this.carService.getOnlyCars().subscribe(response => {
        this.sendCarId = response.data[response.data.length - 1].id;
        this.toastrService.success
        ('Araç Eklendi. Resim Ekleme Sayfasına Gönderiliyorsunuz..');
        this.router.navigate(['/authorized/cars/image/add/', this.sendCarId]);
      });
    }, error => {
      if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
        }
      }
    });
  }
}
