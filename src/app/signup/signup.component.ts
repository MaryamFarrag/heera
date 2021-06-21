import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlacesService } from '../places.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  screen:string = 'accountChoice';
  signupStep:number = 1;
  accountChoice:number = 0;

  public signupForm: FormGroup;
  validation_messages = {
    email: [
      { type: "pattern", message: "Please enter a valid email address." },
      { type: "exists", message: "This email already exists."}
    ],
    number: [
      { type: "pattern", message: "Please enter 10 number at max." }
    ],
    last_name:[
      { type: "pattern", message: "Please enter a name more than 2 letters and less than 35." }
    ],
    first_name:[
      { type: "pattern", message: "Please enter a name more than 2 letters and less than 35." }
    ],
    password:[
      { type: "pattern", message: "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."}
    ],
    tc:[
      { type: "pattern", message: "Please agree to the terms and conditions." }
    ],
  };

  emailExists:boolean;

  constructor(private formBuilder: FormBuilder,private _userService:UserServiceService,private router:Router,private toaster:ToastrService) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let PHONRPATTERN = /^[0-9]{10}$/;
    let PASSWORDPATTERN =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    this.signupForm = this.formBuilder.group({
      email:[
        null,
        {
          validators:[Validators.pattern(EMAILPATTERN),Validators.required],
          // updateOn: "blur"
        }
      ],
      number: [
        null,
        {
          validators: [Validators.pattern(PHONRPATTERN),Validators.required],
          updateOn: "blur",
        },
      ],
      first_name: [
        '',
        {
          validators: [Validators.required,Validators.pattern(/^.{3,35}$/)],
          updateOn: "blur",
        },
      ],
      last_name: [
        null,
        {
          validators: [Validators.required,Validators.pattern(/^.{3,35}$/)],
          updateOn: "blur",
        },
      ],
      password: [
        null,
        {
          validators: [Validators.required,Validators.pattern(PASSWORDPATTERN)],
          updateOn: "blur",
        },
      ],
      // re_password: [
      //   null,
      //   {
      //     validators: [Validators.required],
      //     updateOn: "blur",
      //   },
      // ],
      tc: [
        null,
        {
          validators: [Validators.required],
          updateOn: "blur",
        },
      ],
      want_emails: [
        null,
      ],
      city: [
        null,
        {
          validators: [Validators.required],
          updateOn: "blur",
        },
      ],
    })
  }



  ngOnInit() {}

  chooseType(type){
    this.accountChoice = type;
    this.screen = 'signup';
  }

  checkEmail(value){
      this._userService.emailExists(value).subscribe((res2:any)=>{
        return this.emailExists = false;
      },err=>{
        // if(!res2.success){
          return this.emailExists = true;
        // }
      })    
  }

  signUp(){
    console.log('data =>',this.signupForm);
    if(this.signupForm.valid){
      if(this.accountChoice == 1){
        this.signupForm.value.userType = "client";
      }
      if(this.accountChoice == 2){
        this.signupForm.value.userType = "partner";
      }
      this._userService.signUp(this.signupForm.value).subscribe(res=>{
        console.log('signined?',res);
        localStorage.setItem('email',this.signupForm.value.email);
        this.toaster.success("An email has been sent to you, please verify.")
        this.router.navigate(['/verify',{text:'An email has been sent to you, please verify your email.'}]);
      })
     
    }
    else{
      window.alert('Please fill all fields.')
    }
  }

}
