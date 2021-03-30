import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarImageService} from '../../../../services/car-image.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../../../services/car.service';
import {Car} from '../../../../models/entityModels/car';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-car-image-edit',
  templateUrl: './car-image-edit.component.html',
  styleUrls: ['./car-image-edit.component.css']
})
export class CarImageEditComponent implements OnInit {
  imageUpdateForm: FormGroup;
  imageIds: any[] = [];
  carId: number;
  car: Car;
  cars: Car[] = [];
  apiUrl = environment.baseUrl;

  constructor(private carImageService: CarImageService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private carService: CarService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = parseInt(params['id']);
        this.getCarDetails(params['id']);
      }
    });
    this.createImageUpdateForm();
  }

  createImageUpdateForm() {
    this.imageUpdateForm = this.formBuilder.group({
      imageId: ['', Validators.required],
    });
  }

  getCarDetails(id: number) {
    this.carService.getCarDetail(id).subscribe(response => {
      this.car = response.data[0];
      this.cars = response.data;
      this.cars.forEach(v => {
        this.imageIds.push(v.imageId);
      });
      if (this.imageIds.length <= 0) {
        this.toastrService.info('Öncelikle Araç Resmi Eklenmelidir');
        this.router.navigate(['/authorized/cars/image/add/', this.carId]);
      }
    });
  }

  checkIfExistsImageId(): boolean {
    let model = Object.assign({}, this.imageUpdateForm.value);
    for (let i = 0; i <= this.imageIds.length; i++) {
      if (model.imageId == this.imageIds[i]) {
        return true;
      }
    }
    return false;
  }

  removeImage() {
    if (!this.checkIfExistsImageId()) {
      this.toastrService.error('Hatalı Id Girişi');
    } else {
      let model = Object.assign({}, this.imageUpdateForm.value);
      this.carImageService.deleteImageById(model).subscribe(response => {
        this.toastrService.info(response.message);
        setTimeout(function() {
          window.location.reload();
        }, 1200);
      });
    }
  }
}
