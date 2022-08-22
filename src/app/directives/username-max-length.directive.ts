import { Directive, ElementRef, HostListener } from '@angular/core';
import {FormControlName} from "@angular/forms";


@Directive({
  selector: '[appUsernameLength]'
})
export class UsernameMaxLengthDirective {

  constructor(private readonly formControl: FormControlName) {}

  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const value = this.formControl.value;

    if (value.length > 12) {
      console.log(value.length, '----------------')
      event.preventDefault();
    }
  }

}
