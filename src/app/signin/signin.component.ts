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

    this._userService.login(value).subscribe((res:any)=>{

      if(res.success){
        console.log(res);
        
        // localStorage.setItem('heera_token','qwertyui');
        this._userService.signin = true;
        if(res.data.role == 'client'){//client
          localStorage.setItem('client','test');

          this.router.navigate(['/profile/client']);
        }
        else{
          localStorage.setItem('partner','test');

          this.router.navigate(['/profile/partner']); 
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
        this.toastr.show(res.message)
        this.screen = 'accountChoice';
      }else{
        this.toastr.error(res.message)
      }
    })
  }

}
