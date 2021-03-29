import {Component, OnInit} from '@angular/core';
import {faCar, faEdit, faPaintBrush, faUser, faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../../services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userIcon = faUserAlt;
  carIcon = faCar;
  customerIcon = faUser;
  colorIcon = faPaintBrush;
  brandIcon = faEdit;
  fullName: string;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.fullName = this.localStorageService.getItem('fullName');
  }
}
