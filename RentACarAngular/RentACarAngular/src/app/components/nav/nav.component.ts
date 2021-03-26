import {Component, OnInit} from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;
  fullName: string;
  id: string;

  constructor(private localStorageService: LocalStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserClaims();
    $(function() {
      $('body').addClass('js');

      var $hamburger = $('.hamburger'),
        $nav = $('#site-nav'),
        $masthead = $('#masthead');

      $hamburger.click(function() {
        $(this).toggleClass('is-active');
        $nav.toggleClass('is-active');
        $masthead.toggleClass('is-active');
        return false;
      });
    });
    $(function() {
      $('body').addClass('js');

      var $hamburger2 = $('.hamburger2'),
        $nav2 = $('#site-nav2'),
        $masthead2 = $('#masthead2');

      $hamburger2.click(function() {
        $(this).toggleClass('is-active');
        $nav2.toggleClass('is-active');
        $masthead2.toggleClass('is-active');
        return false;
      });
    });
  }

  getUserClaims() {
    let id = parseInt(this.localStorageService.getItem('id'));
    if (id != null || id != undefined) {
      this.userService.getUserClaims(id).subscribe(response => {
        for (let index in response.data) {
          this.localStorageService.setItem(response.data[index].name+ '-permission', response.data[index].name);
        }
      });
    }
  }

  checkUserRoles(): boolean {
    return !!(this.localStorageService.getItem('admin-permission')
      || this.localStorageService.getItem('moderator-permission'));
  }

  checkUserLogin(): boolean {
    var user = this.localStorageService.getItem('fullName');
    var id = this.localStorageService.getItem('id');
    if (user == null) {
      return false;
    } else {
      this.fullName = user;
      this.id = id;
      return true;
    }
  }

  clearAllStorage() {
    this.localStorageService.clearAll();
  }
}
