import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../models/entityModels/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  dataLoaded = false;
  removedUser: User;

  constructor(private userService: UserService,
              private toastrService: ToastrService) {
  }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }

  setSelectedUser(user: User) {
    this.removedUser = user;
  }

  removeUser() {
    this.userService.removeUser(this.removedUser).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    });
  }
}
