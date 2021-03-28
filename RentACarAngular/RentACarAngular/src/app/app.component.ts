import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentACarAngular';
  error = 'message';

  checkUserFindeksScore():boolean {
    var findeks = localStorage.getItem('userFindeks');
    return findeks != null;

  }
}
