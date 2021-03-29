import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  checkUserFindeksScore(): boolean {
    var findeks = localStorage.getItem('userFindeks');
    return findeks != null;
  }
}
