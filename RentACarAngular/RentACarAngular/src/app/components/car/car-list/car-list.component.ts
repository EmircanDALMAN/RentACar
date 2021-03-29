import {Component, OnInit} from '@angular/core';
import {CarService} from '../../../services/car.service';
import {Car} from '../../../models/entityModels/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded = false;

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
