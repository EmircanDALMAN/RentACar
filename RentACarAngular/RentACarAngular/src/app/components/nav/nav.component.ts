import {Component, OnInit} from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;
  fullName:string;
  id:string;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
  }

  checkUserLogin():boolean {
    var user = this.localStorageService.getItem('fullName');
    var id = this.localStorageService.getItem('id');
    if (user == null) {
      return false;
    }
    else{
      this.fullName = user;
      this.id = id;
      return true;
    }
  }
}
