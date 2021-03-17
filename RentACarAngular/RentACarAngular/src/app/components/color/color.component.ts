import {Component, OnInit} from '@angular/core';
import {ColorService} from "../../services/color.service";
import {Color} from "../../models/entityModels/color";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  dataLoaded = false;
  error = '';
  constructor(private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    }, error=>{
      this.error = error.name;
    })
  }

}
