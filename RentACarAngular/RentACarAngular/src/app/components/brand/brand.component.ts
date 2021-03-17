import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {Brand} from '../../models/entityModels/brand';

declare var $: any;
import {timer} from 'rxjs';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded = false;
  error = '';

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getBrands();
  }

  // tslint:disable-next-line:typedef
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    });
  }
}
