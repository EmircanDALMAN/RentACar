import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {Brand} from '../../models/entityModels/brand';
import {Filters} from '../../models/entityModels/filters';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded = false;
  error = '';
  currentBrand: Brand;
  allBrand?: Brand;
  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    });
  }
  setCurrentBrand() {
    this.currentBrand !== undefined
      ? (Filters.brandId = this.currentBrand.brandId.toString())
      : (Filters.brandId = '');
  }
  allBrandSelected() {
    return this.currentBrand === undefined ? true : false;
  }
}

