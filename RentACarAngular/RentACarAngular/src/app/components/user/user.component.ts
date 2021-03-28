import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/entityModels/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userUpdateForm: FormGroup;
  id:number;
  user:User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.id = parseInt(this.localStorageService.getItem('id'));
    this.userService.getUserById(this.id).subscribe(response=>{
      this.user = response.data;
      this.createUserUpdateForm();
    })
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.id],
      email: [this.user.email, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      status: [this.user.status],
      password: [this.user.password,Validators.required]
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
