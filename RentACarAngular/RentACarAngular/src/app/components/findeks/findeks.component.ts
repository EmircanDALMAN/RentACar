import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {

  userFindeksForm: FormGroup;

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
      let userFindeksDto = Object.assign({}, this.userFindeksForm.value);
      this.userService.getUserFindeks(userFindeksDto).subscribe(response => {
        this.localStorageService.setItem('userFindeks', response.data.userFindeks.toString());
        this.toastrService.info
        ('Findeks Hesaplaması Başarılı. Findeks Puanınız: ' + response.data.userFindeks.toString());
      }, error => {
        if (error.error.Errors.length > 0) {
          this.toastrService.error(error.error.Errors[0].ErrorMessage, 'Doğrulama hatası');
        }
      });
    } else {
      this.toastrService.info('Form Bilgileriniz Eksik');
    }
  }

  createUserFindeksForm() {
    this.userFindeksForm = this.formBuilder.group({
      tcNo: ['', Validators.required],
      dateYear: ['', Validators.required]
    });
  }

}
