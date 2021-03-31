import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ColorService} from '../../../services/color.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required]
    });
  }

  addColor(){
    if (this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(['/authorized/colors/list'])
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
