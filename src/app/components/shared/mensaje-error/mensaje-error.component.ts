import { Component, OnInit } from '@angular/core';
import {NgbModal ,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.css']
})
export class MensajeErrorComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
