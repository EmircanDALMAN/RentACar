import {Component, OnInit} from '@angular/core';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/entityModels/car';
import {ActivatedRoute} from '@angular/router';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {CarImage} from '../../models/entityModels/carImage';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  error = '';
  filterText = '';
  faLira = faLiraSign;
  carImages: CarImage[] = [];
  baseUrl = environment.baseUrl;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId']) {
        this.getCarByBrandAndColor(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }


  getCarByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  changeFilterTextSize(filterText: string) {
    this.filterText = filterText.toLocaleUpperCase();
  }
}

