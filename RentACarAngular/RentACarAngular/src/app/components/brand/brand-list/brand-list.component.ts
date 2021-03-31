import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../../models/entityModels/brand';
import {BrandService} from '../../../services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded = false;
  removedBrand: Brand;

  constructor(private brandService: BrandService,
              private toastrService: ToastrService) {
  }


  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setSelectedBrand(brand: Brand) {
    this.removedBrand = brand;
  }

  removeBrand() {
    this.brandService.removeBrand(this.removedBrand).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    }, error => {
      if (error.error.StatusCode == '500') {
        this.toastrService.error
        ('Bu Marka Başka Araçlar Tarafından Kullanılıyor.','Silinemez!');
      }
    });
  }
}
