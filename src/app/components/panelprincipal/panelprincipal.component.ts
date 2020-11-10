import { Component, OnInit } from '@angular/core';
/* import * as $ from 'jquery'; */

@Component({
  selector: 'app-panelprincipal',
  templateUrl: './panelprincipal.component.html',
  styleUrls: ['./panelprincipal.component.css']
})
export class PanelprincipalComponent implements OnInit {
  change = 0;
  constructor() {

  }

  ngOnInit(): void {
  }
  switchMenu(): void{
    if(this.change == 0){
      document.getElementById('changeOption').style.display = 'block';
      this.change = 1;
    }else{
      document.getElementById('changeOption').style.display = 'none';
      this.change = 0;
    }

  }
}
