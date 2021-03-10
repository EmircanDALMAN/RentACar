import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {CarService} from '../../services/car.service';
import {Photo} from '../../models/photo';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  constructor(private carService: CarService) {}
  filterText = '';
  cars: Car[] = [];
  ngOnInit(): void {
    this.carService.getCities().subscribe(data => {
      this.cars = data;
    });
  }
}
