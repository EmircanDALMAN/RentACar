import {Component, OnInit} from '@angular/core';
import {Car} from 'src/app/models/car';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService]
})
export class CarComponent implements OnInit {
  filterText = '';
  cars: Car[] = [];
  dataLoaded = false;

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
