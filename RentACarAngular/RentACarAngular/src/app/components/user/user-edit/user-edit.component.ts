import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../models/entityModels/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  userUpdateForm: FormGroup;
  userId: number;
  fakeStatus: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.userId = parseInt(params['id']);
        this.getUserById(params['id']);
      }
    });
  }

  updateUser() {
    let userModel = Object.assign({}, this.userUpdateForm.value);
    userModel.status = this.user.status;
    this.userService.updateUserForAuthorized(userModel).subscribe(response => {
      this.toastrService.success(response.message, 'Başarılı');
      setTimeout(function() {
        window.location.reload();
      }, 1200);
    }, error => {
      if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage, 'Doğrulama hatası');
        }
      }
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(response => {
      this.user = response.data;
      this.fakeStatus = this.user.status;
      this.createUserUpdateForm();
    });
  }

  checkIfUserActive() {
    if (this.fakeStatus == true) {
      return 'Aktif';
    } else {
      return 'Aktif Değil';
    }
  }

  changeUserStatus() {
    let element = <HTMLInputElement> document.getElementById('status');
    if (element.checked == true) {
      this.user.status = false;
    } else {
      this.user.status = true;
    }
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.userId],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      status: [this.user.status],
    });
  }
}
