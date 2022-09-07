import {Component,  OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder,  FormGroup, Validators} from "@angular/forms";
import {AppService} from "../services/app.service";
import * as moment from 'moment';
import {TermsComponent} from "../terms/terms.component";
import {PrivacyComponent} from "../privacy/privacy.component";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit {
  keyword = 'name';
  activeStepIndex: any = 0;
  addressAdded= false;
  step: any | null;
  selectedCity?: string;
  userId: any;
  cities = [];
  success: boolean = false;
  error: boolean = false;
  mailError: boolean = false;
  usernameError: boolean = false;
  registrationForm!: FormGroup;
  errorMessage :string = '';
  password: string = '';
  mailValidation: string = '';
  usernameValidation: string = '';
  year: string = '';
  day: string = '';
  month: string = '';
  username: string = '';
  email: string = '';
  isLegal : boolean = false;
  isLegitMonth : boolean = true;
  agreed : boolean = false;
  bsModalRef?: BsModalRef;
  modalRef?: BsModalRef;
  fieldAlreadyExists: boolean = false;
  provideValidEmail: boolean = false;
  passwordDontMatch: boolean = false;
  invalidId: boolean = false;
  accessToken : string = '';
  // selected?: string;
  noResult = false;
  public captchaResponse = "";
  constructor( public modalService: BsModalService,private fb: FormBuilder,private appService: AppService) {



  }

  ngOnInit(): void {
    this.ageDIff()
    this.checkDaysInmonth()
    // @ts-ignore
    this.activeStepIndex = +localStorage.getItem('activeStep');
    this.registrationForm = this.fb.group({
      gender: ['', Validators.required],
      location: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      looking_for: [''],
      day: ['', [Validators.required, Validators.minLength(2),
        Validators.maxLength(2)]],
      month: ['', [Validators.required,Validators.minLength(2),
        Validators.maxLength(2)]],
      year: ['', [Validators.required,Validators.minLength(4),
        Validators.maxLength(4)]],
      DOB: [''],
      email: ['', [Validators.required, Validators.email]],
      _id: ['']
    });
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  ageDIff(){
      this.isLegal = moment().year() - Number(this.year) >= 18;
  }
  checkDaysInmonth(){
      this.isLegitMonth = moment(`${this.day}-${this.month}-${this.year}`, 'DD-MM-YYYY').isValid();
  }

  checkDays(){
    this.validateDayBorder()
  }
  checkMonths(){
    this.validateMonthBorder()
  }
  checkYears(){
    this.validateYearBorder()
  }
  checkPasswordVal(){
    this.validatePasswordBorder()
  }
  validateDayBorder(){
    if((this.day)?.toString().length === 2){
      if(Number(this.day) > 31 || !this.isLegitMonth){
        return 'validate_input'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  validateMonthBorder(){
    if((this.month)?.toString().length === 2){
      if(Number(this.month) > 12 || !this.isLegitMonth) {
        return 'validate_input'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  validateYearBorder(){
    if((this.year)?.toString().length === 4){
      if(!this.isLegal ){
        return 'validate_input'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  validatePasswordBorder(){
    if(this.password.length > 4){
      if( !this.hasNumber(this.password)){
        return 'validate_input'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
  checkUSername(){
    this.validateUsernameBorder()
  }
  validateUsernameBorder(){
    if(this.username.length > 3){
      if(/^[A-Za-z0-9]+$/.test(this.username) ){
        return ''
      } else {
        return 'validate_input'
      }
    } else {
      return ''
    }
  }
  setDOB(){
    this.registrationForm.value.DOB = this.registrationForm.value.year + '-' + this.registrationForm.value.month + '-' + this.registrationForm.value.day
  }
  onSelectGender(type: boolean){
    this.registrationForm.value.gender = type;
  }
  hasNumber(password? :any) {
    return /\d/.test(password);
  }
  checkPasswordNumber(){
    if (this.password.length >1 ){
      return this.hasNumber(this.password)
    } else {
      return
    }
  }
  hide(){
    this.modalService?.hide()
  }
  next(e: any) {
    setTimeout(() => {
      this.activeStepIndex = e.selectedIndex + 1;
        e.next();
    }, 100)
  }
  back(e : any) {
    if (this.activeStepIndex !== 0) {
      e.previous();
        this.activeStepIndex = e.selectedIndex;
    } else {

      e.back();
    }
  }

  onSubmit(form: FormGroup) {
    this.startRegister(form);
    localStorage.setItem('activeStep', '0');
  }
  getselectedAdress(selectedCity: string | undefined){
    this.selectedCity = selectedCity;
  }
  getLocations(event: any){
      this.appService.getLocations({site_key: 'no01', search: this.selectedCity}).subscribe((response) =>{
        this.cities= response.Data.slice(0, 4);
      })
  }

  checkUsername(form: FormGroup, e: any){
    this.appService.registerStart({ username: this.registrationForm.value.username, site_key: 'no01'}).subscribe(response => {
      if(response.Status == 'ok'){
        this.userId = response.Data;
        this.next(e)
      }
    }, error1 => {
      this.usernameError = true;
      this.usernameValidation = error1.error.Error.message;
      if(error1.error.Error.code === 100){
        this.fieldAlreadyExists = true
      }
    });
  }

  checkPassword(form: FormGroup, e: any){
    this.appService.registerNext({ password: this.registrationForm.value.password, site_key: 'no01'},this.userId).subscribe(response => {
      if(response.Status == 'ok'){
        this.userId = response.Data;
        this.next(e)
      }
    }, error1 => {
      this.usernameError = true;
      this.usernameValidation = error1.error.Error.message;
      if(error1.error.Error.code === 105){
        this.passwordDontMatch = true
      }else if(error1.error.Error.code === 108){
        this.invalidId = true
      }
    });
  }
  public resolved(captchaResponse: string): void {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }

  startRegister(form: FormGroup){
    this.appService.registerStart({ username: this.registrationForm.value.username,email: this.registrationForm.value.email, site_key: 'no01', recaptcha_token:'6LfaWcEhAAAAAHwQHm7ihT2jKaZqnGVuwvsAL8LK'}).subscribe(response => {
      if(response.Status == 'ok'){
        this.userId = response.Data;
        const params = {
          ...form.value
        };
        params.gender = this.registrationForm.value.gender == '' ? 'male' : 'female'
        if(params.gender === 'male'){
          params.looking_for = 'female'
        } else if(params.gender === 'male'){
          params.looking_for = 'male'

        }
        params._id = this.userId;
        params.DOB = this.registrationForm.value.year + '-' + this.registrationForm.value.month + '-' + this.registrationForm.value.day
        delete params.month;
        delete params.day;
        delete params.year;
        delete params.username;
        this.appService.registerNext({...params,site_key: 'no01' },this.userId).subscribe(response => {
          this.success =true;
          setTimeout(()=>{
            this.appService.registerSession({ password: this.registrationForm.value.password,email: this.registrationForm.value.email, site_key: 'no01'}).subscribe(response => {
              console.log(response);
              this.accessToken = response.Data.access_token;
              localStorage.setItem('access_token', this.accessToken);
              window.location.href = 'https://temptingcrush.com/?token=' + this.accessToken;
            })
          }, 500);
        }, error => {
          this.errorMessage = error.error.Error.message
          this.error = true;
          if(error.error.Error.code === 100){
            this.fieldAlreadyExists = true
          }else if ( error.error.Error.code === 106){
            this.provideValidEmail = true
          }
        })
      }
    }, error1 => {
      this.mailError = true;
      this.mailValidation = error1.error.Error.message;
      if(error1.error.Error.code === 100){
        this.fieldAlreadyExists = true
      }
    });
  }
  openTerms() {
    this.bsModalRef = this.modalService.show(TermsComponent,  Object.assign({}, { class: 'modal-lg terms' }));
    // @ts-ignore
    this.bsModalRef.onHidden.subscribe( res => {
      console.log('');
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openPrivacy(){
    this.modalRef = this.modalService.show(PrivacyComponent,  Object.assign({}, { class: 'modal-lg terms' }));
    // @ts-ignore
    this.modalRef.onHidden.subscribe( res => {
      console.log('');
    })
    this.modalRef.content.closeBtnName = 'Close';
  }
  agree(){
      this.agreed = !this.agreed
  }
}
