import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {RentalService} from '../../../services/rental.service';
import {Rental} from '../../../models/entityModels/rental';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {


  rentals: Rental[] = [];
  dataLoaded = false;
  error = '';
  removedRental: Rental;

  constructor(private rentalService: RentalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getRentalsDetails();
  }

  setSelectedRental(rental: Rental) {
    this.removedRental = rental;
  }

  removeRental() {
    this.rentalService.removeRental(this.removedRental).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
  }

  getRentalsDetails() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    }, error => {
      this.error = error.name;
    });
  }
}
