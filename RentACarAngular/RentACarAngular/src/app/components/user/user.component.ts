import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';

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
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.createUserUpdateForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [parseInt(this.localStorageService.getItem('id'))],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      passwordHash: [this.localStorageService.getItem('passwordHash')],
      passwordSalt: [this.localStorageService.getItem('passwordSalt')],
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
