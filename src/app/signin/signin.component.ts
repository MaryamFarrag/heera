import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private router:Router,private _userService:UserServiceService,private toastr: ToastrService) { }

  ngOnInit() {
    localStorage.clear();
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

    this._userService.login(value).subscribe((res:any)=>{

      if(res.success){
        // localStorage.setItem('heera_token','qwertyui');
        this._userService.signin = true;
        if(this.accountChoice == 1){//client
          localStorage.setItem('client','test');

          this.router.navigate(['/profile/client']);
        }
        else{
          localStorage.setItem('partner','test');

          this.router.navigate(['/profile/partner']); 
        }
      }
      else{
        this.toastr.error(res.msg);
        if(res.msg == 'Account is not verified Please Verify the Account'){
          this.router.navigate(['/verify']);
        }
      }
    },err=>{
      console.log(err);
      this.toastr.error("Something went wrong");
    })

    // if(this.accountChoice == 1){//client
    //   this._userService.login(value).subscribe((res:any)=>{

    //     if(res.status){

    //       localStorage.setItem('client','test');
    //       localStorage.setItem('heera_token','qwertyui');
    //       this._userService.signin = true;

    //       this.router.navigate(['/profile/client']);
    //     }
    //     else{
    //       this.toastr.error(res.msg);
    //       if(res.msg == 'Account is not verified Please Verify the Account'){
    //         this.router.navigate(['/verify']);
    //       }
    //     }
    //   },err=>{
    //     console.log(err);
    //     this.toastr.error("Something went wrong");
    //   })
    // }
    // else{//partner
    //   this._userService.signinEmployer(value).subscribe((res:any)=>{

    //     if(res.status){
    //       localStorage.setItem('heera_token','qwertyui');
    //       localStorage.setItem('partner','test');
    //       this._userService.signin = true;

    //       this.router.navigate(['/profile/partner']);
    //     }

    //     else{
    //       this.toastr.error(res.msg)
    //       if(res.msg == 'Account is not verified Please Verify the Account'){
    //         this.router.navigate(['/verify']);
    //       }
    //     }

    //   },err=>{
    //     console.log(err);
    //     this.toastr.error("Something went wrong")
    //   })
    // }
  }
  forgotPass(data){
    this._userService.forgotPass(data).subscribe((res:any)=>{
      console.log('res',res);
      if(res.success){
        this.toastr.show(res.message)
      }else{
        this.toastr.error(res.message)
      }
    })
  }

}
