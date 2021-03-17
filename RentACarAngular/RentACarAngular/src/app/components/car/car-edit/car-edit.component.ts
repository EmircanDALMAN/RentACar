import { Component, OnInit } from '@angular/core';
import {Car} from '../../../models/entityModels/car';
import {CarService} from '../../../services/car.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }
  dataLoaded = false;
  cars: Car[] = [];
  // @ts-ignore
  currentCar: Car;
  error = '';
  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   if (params["id"]) {
    //     this.getCarDetailsById(params["id"])
    //   } else {
    //     this.getCarDetails();
    //   }
    // })
  }
  // getCarDetails() {
  //   this.carService.getCarDetails().subscribe(response => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   }, error => {
  //     this.error = error.name;
  //   })
  // }
  //
  // getCarDetailsById(id: number) {
  //   this.carService.getCarDetailsByBrandId(id).subscribe(response => {
  //     this.cars = response.data;
  //     this.dataLoaded = true;
  //   }, error => {
  //     this.error = error.name;
  //   })
  // }
}
