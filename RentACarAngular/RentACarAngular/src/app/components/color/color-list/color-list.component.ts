import { Component, OnInit } from '@angular/core';
import {Brand} from '../../../models/entityModels/brand';
import {BrandService} from '../../../services/brand.service';
import {ToastrService} from 'ngx-toastr';
import {Color} from '../../../models/entityModels/color';
import {ColorService} from '../../../services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded = false;
  selectedColor: Color;

  constructor(private colorService:ColorService,
              private toastrService: ToastrService) {
  }


  ngOnInit(): void {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  setSelectedColor(color:Color) {
    this.selectedColor = color;
  }

  removeColor() {
    this.colorService.removeColor(this.selectedColor).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    }, error => {
      if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
        }
      }
    });
  }
}
