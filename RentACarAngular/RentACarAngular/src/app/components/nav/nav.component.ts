import { Component, OnInit } from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }
  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;
  ngOnInit(): void {
  }

}
