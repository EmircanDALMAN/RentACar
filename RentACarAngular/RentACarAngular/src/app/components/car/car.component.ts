import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/entityModels/car";
import {ActivatedRoute} from "@angular/router";
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {CarImage} from "../../models/entityModels/carImage";

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

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      } else {
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    })
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
}

