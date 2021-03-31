import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/entityModels/customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
  }

}
