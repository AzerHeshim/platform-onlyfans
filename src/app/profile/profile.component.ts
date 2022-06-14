import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
