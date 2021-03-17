import {Component, OnInit} from '@angular/core';
import {RentalService} from "../../services/rental.service";
import {Rental} from "../../models/entityModels/rental";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  dataLoaded = false;
  error = '';
  constructor(private rentalService: RentalService) {
  }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    },error=>{
      this.error = error.name;
    })
  }
}
