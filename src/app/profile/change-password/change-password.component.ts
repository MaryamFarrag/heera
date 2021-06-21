import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  err = '';
  constructor(private _userService:UserServiceService,private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
  }
  change(data){    
    console.log(data.controls.password.errors);
    if(data.controls.password.errors){
      return this.err = 'Please include a Capital letter, a small letter, a number, and a symbol, in your password.'
    }
    else{
      this.err = '';
    }
    if(data.value.password == data.value.confirm_password){
      // this.toastr.success("Password changed. Thank you.");
      // this.router.navigate(['/signin',{text:'Password changed. type your new password',screen:'signin'}]);
      this._userService.changePassword(data.value).subscribe(res=>{
        this.toastr.success("Password changed. Thank you.");
        this.router.navigate(['/verify',{text:'Your password has been changed. Thank you.'}]);
        // this.router.navigate(['/signin',{text:'Password changed. type your new password',screen:'signin'}]);
      },err=>{
        if(err.error){
          this.toastr.error(err.error.message);
        }
        else{
          this.toastr.error("Something went wrong, try again later.")
        }
      })
    } 
    else{
      this.err = "Confirm password doesn't match the password."
    }
  }

}
