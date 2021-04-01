import {Component, OnInit} from '@angular/core';
import {faCar, faEdit, faHome, faPaintBrush, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../../services/local-storage.service';
import {faAmazonPay} from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userIcon = faUserCircle;
  carIcon = faCar;
  customerIcon = faUser;
  colorIcon = faPaintBrush;
  brandIcon = faEdit;
  payIcon = faAmazonPay;
  homeIcon = faHome;
  fullName: string;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fullName = this.localStorageService.getItem('fullName');
  }

  goHomePage() {
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
