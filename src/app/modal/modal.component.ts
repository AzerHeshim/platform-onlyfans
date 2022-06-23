import { Component, OnInit } from '@angular/core';
import {NgSelectConfig} from "@ng-select/ng-select";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  activeStepIndex: any = 0;
  addressAdded= true;
  step: any | null;
  selectedCity: number | undefined;
  cities = [
    { id: 1, name: 'London' },
    { id: 2, name: 'Brighton' },
    { id: 3, name: 'Edinburgh' },
    { id: 4, name: 'Manchester' },
  ];
  constructor(private config: NgSelectConfig, public modalService: BsModalService) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
  //   console.log(this.step, 'opop')
  // setInterval(() => {
  //
  //   }, 1000);
    // @ts-ignore
    this.activeStepIndex = +localStorage.getItem('activeStep');
    console.log(this.activeStepIndex)
  }
  hide(){
    this.modalService?.hide()
  }
  next(e: any) {
    setTimeout(() => {
      this.activeStepIndex = e.selectedIndex + 1;
      localStorage.setItem('activeStep', this.activeStepIndex)
      if (this.activeStepIndex === 4 && this.selectedCity === undefined) {
        this.addressAdded = false
      } else {
        this.addressAdded = true;
        e.next();
      }
    }, 10)
  }
  back(e : any) {
    if (this.activeStepIndex !== 0) {
      e.previous();
      setTimeout(() => {
        this.activeStepIndex = e.selectedIndex;
        localStorage.setItem('activeStep', this.activeStepIndex)
      }, 10)
    } else {

      e.back();
    }
  }
}
