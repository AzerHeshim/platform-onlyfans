import {APP_INITIALIZER, Injectable, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal/modal.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgStepperModule} from "angular-ng-stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AlertModule} from "ngx-bootstrap/alert";
import { TwoDigitDecimaNumberDirective} from './directives/two-digit-handling.directive';
import {FourDigitDecimaNumberDirective} from './directives/four-digit-handling.directive';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import { UsernameMaxLengthDirective } from './directives/username-max-length.directive';
import {RecaptchaCommonModule} from "ng-recaptcha/lib/recaptcha-common.module";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";


@Injectable({providedIn: 'root'})
export class HttpClientTrans extends HttpClient {
  constructor(handler: HttpBackend) {
    super(handler);
  }
}

export function HttpLoaderFactory(httpClient: HttpClientTrans) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ModalComponent,
    TwoDigitDecimaNumberDirective,
    FourDigitDecimaNumberDirective,
    TermsComponent,
    PrivacyComponent,
    UsernameMaxLengthDirective,
  ],
  imports: [
    RecaptchaModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CdkStepperModule,
    NgStepperModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClientTrans]
      }
    }),
    ReactiveFormsModule,
    AlertModule,
    TypeaheadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

