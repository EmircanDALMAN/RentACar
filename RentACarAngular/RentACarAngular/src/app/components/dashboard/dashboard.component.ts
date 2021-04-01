import {Component, OnInit} from '@angular/core';
import {Car} from '../../models/entityModels/car';
import {environment} from '../../../environments/environment';
import {CarService} from '../../services/car.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/entityModels/user';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  carDetails: Car[];
  nowRentedCars: Car[];
  lastAddedCar: Car;
  lastRegisterUser: User;
  mostRentedUser: User;
  carsCount: any;
  usersCount: any;
  nowRentedCarsCount: any;
  customersCount: any;
  apiUrl = environment.baseUrl;
  car: Car;
  bringNewest: Car;
  carYear: string;
  carMonth: string;
  carDay: string;
  lastAddedCarYear: string;
  lastAddedCarMonth: string;
  lastAddedCarDay: string;

  constructor(private carService: CarService,
              private userService: UserService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCarsCount();
    this.getUsersCount();
    this.getLastAddedCar();
    this.getBringNewestCar();
    this.getLastRegisterUser();
    this.getCustomersCount();
    this.getNowRentedCarsCount();
    this.getMostRentedCar();
    this.getMostRentedUser();
  }

  getLastAddedCar() {
    this.carService.getLastAddedCar().subscribe(response => {
      this.lastAddedCar = response.data;
      this.splitLastAddedCarDate();
    });
  }

  getNowRentedCars() {
    this.carService.getNowRentedCars().subscribe(response => {
      this.nowRentedCars = response.data;
    });
  }

  getNowRentedCarsCount() {
    this.carService.getNowRentedCarsCount().subscribe(response => {
      this.nowRentedCarsCount = response;
    });
  }

  getCustomersCount() {
    this.customerService.getCustomersCount().subscribe(response => {
      this.customersCount = response;
    });
  }

  getLastRegisterUser() {
    this.userService.getLastRegisterUser().subscribe(response => {
      this.lastRegisterUser = response.data;
      this.splitUserEmail();
    });
  }


  getMostRentedUser() {
    this.userService.getMostRentedUser().subscribe(response => {
      this.mostRentedUser = response.data;
      this.splitMostRentedUserEmail();
    });
  }

  splitMostRentedUserEmail() {
    if (this.mostRentedUser != null) {
      var email = this.mostRentedUser.email.split('@', 1);
      this.mostRentedUser.email = email[0];
    }
  }

  getBringNewestCar() {
    this.carService.getBringNewestCar().subscribe(response => {
      this.bringNewest = response.data;
    });
  }

  getCarsCount() {
    this.carService.getCarsCount().subscribe(response => {
      this.carsCount = response;
    });
  }

  getUsersCount() {
    this.userService.getUsersCount().subscribe(response => {
      this.usersCount = response;
    });
  }


  getMostRentedCar() {
    this.carService.getMostRentedCar().subscribe(response => {
      this.carDetails = response.data;
      this.car = this.carDetails[0];
      this.splitMostRentedCarDate();
    });
  }

  splitUserEmail() {
    if (this.lastRegisterUser != null) {
      var email = this.lastRegisterUser.email.split('@', 1);
      this.lastRegisterUser.email = email[0];
    }
  }

  splitMostRentedCarDate() {
    if (this.car != null) {
      var fullDate = this.car.date.toString().split('-', 3);
      this.carYear = fullDate[0];
      this.carMonth = fullDate[1];
      this.carDay = fullDate[2].substr(0, 2);
    }
  }

  splitLastAddedCarDate() {
    if (this.lastAddedCar != null) {
      var fullDate = this.lastAddedCar.date.toString().split('-', 3);
      this.lastAddedCarYear = fullDate[0];
      this.lastAddedCarMonth = fullDate[1];
      this.lastAddedCarDay = fullDate[2].substr(0, 2);
    }
  }
}
