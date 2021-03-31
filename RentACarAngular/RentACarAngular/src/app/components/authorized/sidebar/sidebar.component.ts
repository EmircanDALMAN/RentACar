import {Component, OnInit} from '@angular/core';
import {faCar, faEdit, faPaintBrush, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../../services/local-storage.service';
import {faAmazonPay} from '@fortawesome/free-brands-svg-icons';

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
  fullName: string;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.fullName = this.localStorageService.getItem('fullName');
  }
}
