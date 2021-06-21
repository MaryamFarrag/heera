import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  screen:string = 'accountChoice';
  accountChoice:number = 0;

  text:string;
  loginText:string;


  constructor(private router:Router,private _userService:UserServiceService,private toastr: ToastrService,private route:ActivatedRoute) { }

  ngOnInit() {
    localStorage.clear();
    this.route.params.subscribe(res=>{
      this.text = res.text;
      if(res.screen){
        this.screen = res.screen;
      }
    })
    
  }

  chooseType(type){
    this.accountChoice = type;
    this.screen = 'signin';
  }

  login(value){
    localStorage.setItem('email',value.email);
    
    // localStorage.setItem('client','test');
    // localStorage.setItem('heera_token','qwertyui');
    // this._userService.signin = true;
    // this.router.navigate(['/']);
    if(!value.email){
      return this.loginText = 'Please enter your correct email and password.';
    }

    this._userService.login(value).subscribe((res:any)=>{

      if(res.success){
        console.log(res);
        
        // localStorage.setItem('heera_token','qwertyui');
        this._userService.signin = true;
        if(res.data.role == 'client' && this.accountChoice == 1){//client
          localStorage.setItem('client','test');

          this.router.navigate(['/profile/client']);
        }
        else if( res.data.role == 'client' && this.accountChoice != 1){
          this.text = 'Please sign in as a client';
          this.screen = 'accountChoice'
         
        }
        else if( res.data.role == 'partner' && this.accountChoice != 1){
          localStorage.setItem('partner','test');
          this.router.navigate(['/profile/partner']); 
        }
        else{
          this.text = 'Please sign in as a partner';
          this.screen = 'accountChoice';
        }
      }
      else{
        this.toastr.error(res.message); 
      }
    },err=>{
      console.log(err);
      if(err.error){
        this.toastr.error(err.error.message);
      }
      else{
        this.toastr.error("Something went wrong");
      }
    })

  }
  forgotPass(data){
    this._userService.forgotPass(data).subscribe((res:any)=>{
      if(res.success){
        this.toastr.show(res.message);
        this.router.navigate(['/verify',{text:'An email has been sent to you with the new password, please check your email.'}])
      }else{
        this.toastr.error(res.message)
      }
    })
  }

}
