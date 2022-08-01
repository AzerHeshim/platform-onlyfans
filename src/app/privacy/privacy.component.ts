import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }
hideModal(){
  this.modalRef.hide();
}
}
