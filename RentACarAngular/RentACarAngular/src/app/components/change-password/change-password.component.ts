import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }
  githubIcon = faGithub;
  instagramIcon = faInstagram;
  ngOnInit(): void {
    this.animation();
  }
  animation() {
    $(".txtb input").on("focus", function() {
      $(this).addClass("focus");
    });

    $(".txtb input").on("blur", function() {
      if ($(this).val() == "")
        $(this).removeClass("focus");
    });
  }
}
