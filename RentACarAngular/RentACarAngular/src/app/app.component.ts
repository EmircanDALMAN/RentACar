import { Component } from '@angular/core';
import {CarComponent} from "./components/car/car.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentACarAngular';
  error = 'message';
}
