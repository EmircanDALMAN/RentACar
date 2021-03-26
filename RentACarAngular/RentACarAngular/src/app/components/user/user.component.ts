import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if (parseInt(this.localStorageService.getItem('id')) != params['id']) {
        this.toastrService.info('Bu Hesabı Düzenlemeye Yetkiniz Yoktur. Yönlendiriliyorsunuz..');
        this.router.navigate(['/']);
      }
    });
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [parseInt(this.localStorageService.getItem('id'))],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: [true],
      password: ['1234']
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.updateUser(userModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
      }, error => {
        if (error.error.Errors.length > 0) {
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
          }
        }
      });
    }
  }
}
