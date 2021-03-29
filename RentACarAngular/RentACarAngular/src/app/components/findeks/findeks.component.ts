import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {faTimes,} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {

  userFindeksForm: FormGroup;
  closeIcon = faTimes;

  constructor(private userService: UserService,
              private localStorageService: LocalStorageService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createUserFindeksForm();
  }

  getUserFindeks() {
    if (this.userFindeksForm.valid) {
      if (!this.checkIfUserHasFindeks()) {
        let userFindeksDto = Object.assign({}, this.userFindeksForm.value);
        this.userService.getUserFindeks(userFindeksDto).subscribe(response => {
          this.localStorageService.setItem('userFindeks', response.data.userFindeks.toString());
          this.toastrService.info
          ('Findeks Hesaplaması Başarılı. Findeks Puanınız: ' + response.data.userFindeks.toString());
          this.reloadWindow()
        }, error => {
          if (error.error.Errors.length > 0) {
            this.toastrService.error(error.error.Errors[0].ErrorMessage, 'Doğrulama hatası');
          }
        });
      } else {
        this.toastrService.info
        ('Findeks Puanı Zaten Hesaplanmış. Findeks Puanınız: ' + this.getIfUserHasFindeks());
        this.reloadWindow();
      }
    } else {
      this.toastrService.info('Form Bilgileriniz Eksik');
    }
  }

  checkIfUserHasFindeks() {
    return !!this.localStorageService.getItem('userFindeks');
  }

  getIfUserHasFindeks() {
    var findeks = this.localStorageService.getItem('userFindeks');
    if (findeks != null) {
      return findeks;
    }
    return null;
  }

  reloadWindow() {
    setTimeout(() => window.location.reload(), 2500);
  }

  createUserFindeksForm() {
    this.userFindeksForm = this.formBuilder.group({
      tcNo: ['', Validators.required],
      dateYear: ['', Validators.required]
    });
  }

}
