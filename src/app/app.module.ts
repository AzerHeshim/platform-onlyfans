import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgStepperModule} from "angular-ng-stepper";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CdkStepperModule,
    NgStepperModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
