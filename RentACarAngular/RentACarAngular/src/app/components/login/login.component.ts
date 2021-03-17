import { Component, OnInit } from '@angular/core';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() { }

  keyIcon = faKey;
  userIcon = faUser;
  ngOnInit(): void {
      this.animation();
  }
  animation(){
    $(".txtb input").on("focus",function(){
      $(this).addClass("focus");
    });

    $(".txtb input").on("blur",function(){
      if($(this).val() == "")
        $(this).removeClass("focus");
    });
  }
}
