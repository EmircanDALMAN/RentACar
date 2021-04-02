import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  keyIcon = faKey;
  userIcon = faUser;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.animation();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
          this.localStorageService.setToken(response.data);
          this.userService.getUser(loginModel.email).subscribe(response => {
            this.localStorageService.setItem('fullName', response.data.firstName + ' ' + response.data.lastName);
            this.localStorageService.setItem('id', response.data.id.toString());
          });
          this.toastrService.info('Giriş Başarılı. Yönlendiriliyorsunuz..');
          this.router.navigate(['/']).then(() =>
            setTimeout(function() {
              window.location.reload();
            }, 1200));
        }, error => {
          this.toastrService.error(error.error);
        }
      );
    }
  }

  animation() {
    $('.txtb input').on('focus', function() {
      $(this).addClass('focus');
    });

    $('.txtb input').on('blur', function() {
      if ($(this).val() == '') {
        $(this).removeClass('focus');
      }
    });
  }
}
