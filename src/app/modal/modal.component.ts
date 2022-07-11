import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {NgSelectConfig} from "@ng-select/ng-select";
import {BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../services/app.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  activeStepIndex: any = 0;
  addressAdded= true;
  step: any | null;
  selectedCity: string | undefined;
  userId: any;
  cities = [];
  success: boolean = false;
  error: boolean = false;
  mailError: boolean = false;
  registrationForm!: FormGroup;
  errorMessage :string = '';
  password: string = '';
  mailValidation: string = '';
  constructor(private config: NgSelectConfig, public modalService: BsModalService,private fb: FormBuilder,private appService: AppService) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';


  }

  ngOnInit(): void {
    // @ts-ignore
    this.activeStepIndex = +localStorage.getItem('activeStep');
    this.registrationForm = this.fb.group({
      gender: ['', Validators.required],
      location: ['', Validators.required],
      username: ['', Validators.required, Validators.minLength(6)],
      password: ['', Validators.required],
      looking_for: [''],
      day: ['', Validators.required, Validators.minLength(2),
        Validators.maxLength(2)],
      month: ['', Validators.required,Validators.minLength(2),
        Validators.maxLength(2)],
      year: ['', Validators.required,Validators.minLength(4),
        Validators.maxLength(4), Validators.min(2004), Validators.max(2022)],
      DOB: [''],
      email: ['', [Validators.required, Validators.email]],
    });
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
      this.appService.getLocations({site_key: 'no01', search: event.term}).subscribe((response) =>{
        this.cities= response.Data
      })
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
}
