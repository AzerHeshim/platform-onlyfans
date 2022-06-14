import { Component, OnInit } from '@angular/core';
import {NgSelectConfig} from "@ng-select/ng-select";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  activeStepIndex: any = 0;
  addressAdded= true;
  selectedCity: number | undefined;
  cities = [
    { id: 1, name: 'London' },
    { id: 2, name: 'Brighton' },
    { id: 3, name: 'Edinburgh' },
    { id: 4, name: 'Manchester' },
  ];
  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
  }
  next(e: any) {
    this.activeStepIndex = null;
    setTimeout(() => {
      this.activeStepIndex = e.selectedIndex + 1;
      if (this.activeStepIndex === 5 && this.selectedCity === undefined) {
        this.addressAdded = false
      } else {
        this.addressAdded = true;
        e.next();
      }
    }, 10)
  }
}
