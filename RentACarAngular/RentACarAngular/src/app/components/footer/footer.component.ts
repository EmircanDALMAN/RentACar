import { Component, OnInit } from '@angular/core';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  mailIcon = faEnvelopeOpen;
  githubIcon = faGithub;
  instagramIcon = faInstagram;
  ngOnInit(): void {
  }

}
