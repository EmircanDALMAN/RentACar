import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private toastrService:ToastrService,
              private authService:AuthService) {
  }

  ngOnInit(): void {
    this.animation();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.login(registerModel).subscribe(response => {
          localStorage.setItem('token', response.data.token);
          this.toastrService.info(response.message);
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
