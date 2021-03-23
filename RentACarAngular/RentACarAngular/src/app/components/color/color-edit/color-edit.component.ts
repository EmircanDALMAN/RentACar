import {Component, OnInit} from '@angular/core';
import {ColorService} from '../../../services/color.service';
import {Color} from '../../../models/entityModels/color';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  colors: Color[] = [];
  colorUpdateForm: FormGroup;
  colorId: number;

  constructor(private colorService: ColorService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.colorId = parseInt(params['id']);
        this.getColorById(params['id']);
      }
    });
    this.createColorUpdateForm();
  }
  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(response => {
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
  getColorById(id: number) {
    this.colorService.getColorById(id).subscribe(response => {
      this.colors = response.data;
      console.log(response);
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorId],
      colorName: ['', Validators.required],
    });
  }
}
