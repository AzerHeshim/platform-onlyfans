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
  addressAdded= true;
  step: any | null;
  selectedCity: string | undefined;
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
  isLegal : boolean = false;
  isLegitMonth : boolean = false;
  agreed : boolean = false;
  bsModalRef?: BsModalRef;

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
    });
  }

  ageDIff(){
      this.isLegal = moment().year() - Number(this.year) >= 18;
  }
  checkDaysInmonth(){
    this.isLegitMonth = moment(`${this.day}-${this.month}-${this.year}`, 'DD-MM-YYYY').isValid();
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
    });
  }
  startRegister(form: FormGroup){
    this.appService.registerStart({ username: this.registrationForm.value.username,email: this.registrationForm.value.email, site_key: 'no01'}).subscribe(response => {
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
        params.DOB = this.registrationForm.value.year + '-' + this.registrationForm.value.month + '-' + this.registrationForm.value.day
        delete params.month;
        delete params.day;
        delete params.year;
        this.appService.registerNext({...params,site_key: 'no01' },this.userId).subscribe(response => {
          this.success =true
        }, error => {
          this.errorMessage = error.error.Error.message
          this.error = true
        })
      }
    }, error1 => {
      this.mailError = true;
      this.mailValidation = error1.error.Error.message;
    });
  }
  openTerms() {
    this.bsModalRef = this.modalService.show(TermsComponent,  Object.assign({}, { class: 'modal-sm terms' }));
    // @ts-ignore
    this.bsModalRef.onHidden.subscribe( res => {
      console.log('');
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openPrivacy(){
    this.bsModalRef = this.modalService.show(PrivacyComponent,  Object.assign({}, { class: 'modal-sm terms' }));
    // @ts-ignore
    this.bsModalRef.onHidden.subscribe( res => {
      console.log('');
    })
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  agree(){
      this.agreed = true
  }
}
