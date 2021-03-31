import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CarImageService} from '../../../../services/car-image.service';
import {ToastrService} from 'ngx-toastr';
import {Car} from '../../../../models/entityModels/car';
import {CarService} from '../../../../services/car.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  imageAddForm: FormGroup;
  carId: number;
  fileName: string;
  lastUploadedPhotoName: string;
  carDetails: Car[];
  apiUrl = environment.baseUrl;


  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private carImageService: CarImageService,
              private toastrService: ToastrService,
              private carService: CarService) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = params['id'];
        this.getCarDetail(params['id']);
      }
    });
    this.createImageAddForm();
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      if (response.data[0].imageId > 0) {
        this.carDetails = response.data;
      }
    });
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.carId],
      file: ['', Validators.required],
    });
  }

  checkFileExtension(): boolean {
    var idxDot = this.fileName.lastIndexOf('.') + 1;
    var extFile = this.fileName.substr(idxDot, this.fileName.length).toLowerCase();
    return extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png';
  }

  uploadFile(event: any) {
    if (event.target.files.length != 0) {
      this.fileName = event.target.files[0].name;
      if (this.checkFileExtension()) {
        const file = (event.target as HTMLInputElement).files[0];
        this.imageAddForm.patchValue({
          file: file
        });
        this.imageAddForm.get('file').updateValueAndValidity();
        this.lastUploadedPhotoName = file.name;
      } else {
        this.toastrService.error('Sadece Jpg/Jpeg/Png Yüklenebilir!');
      }
    }
  }

  addImage() {
    if (this.imageAddForm.valid && this.checkFileExtension()) {
      var formData: any = new FormData();
      formData.append('carId', this.imageAddForm.get('carId').value);
      formData.append('file', this.imageAddForm.get('file').value);

      this.carImageService.addImage(formData).subscribe(response => {
        this.toastrService.success(response.message);
        setTimeout(function() {
          window.location.reload();
        }, 1200);
      }, error => {
        if (error.error.Errors.length > 0) {
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik');
    }

  }
}
