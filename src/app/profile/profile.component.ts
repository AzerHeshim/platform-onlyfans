import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ModalComponent} from "../modal/modal.component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  bsModalRef?: BsModalRef;
  language : string = '';
  constructor(private modalService: BsModalService,private translate: TranslateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.translate.use('en');
    // LANGUAGE SERVICE IF NEEDED IN FUTURE
    // this.language = this.route.snapshot.params['language'];
    // if(this.language === 'en'){
    //   this.translate.setDefaultLang('en');
    //   this.translate.use('en');
    // } else if (this.language === 'ge'){
    //   this.translate.setDefaultLang('ge');
    //   this.translate.use('ge');
    // } else {
    //   this.translate.setDefaultLang('en');
    //   this.translate.use('en');
    // }
  }
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ModalComponent);
    // @ts-ignore
    this.bsModalRef.onHidden.subscribe( res => {
      console.log('');
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
