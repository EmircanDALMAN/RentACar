import {Component, OnInit} from '@angular/core';
import {CarService} from '../../../services/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../../models/entityModels/brand';
import {Color} from '../../../models/entityModels/color';
import {ToastrService} from 'ngx-toastr';
import {BrandService} from '../../../services/brand.service';
import {ColorService} from '../../../services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  error = '';
  carUpdateForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  carId: number;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private colorService: ColorService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = parseInt(params['id']);
      }
    });
    this.createCarUpdateForm();
    this.brandList();
    this.colorList();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.carId],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
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

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
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
