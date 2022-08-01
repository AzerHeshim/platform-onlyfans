import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {TOSData} from "../TOS-config";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  terms: typeof TOSData = TOSData ;

  constructor(private modalReff: BsModalRef) { }

  ngOnInit(): void {
  }
  hideModal(){
    this.modalReff.hide();
  }
}
