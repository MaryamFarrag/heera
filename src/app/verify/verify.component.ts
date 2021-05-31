import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private _userService:UserServiceService,private router:Router,private toastr: ToastrService) { }
  otp;

  ngOnInit() {
  }

  send(){
    this._userService.sendOtp(this.otp).subscribe(res=>{
      console.log('sent',res);
      this.router.navigate(['/'])
    },err=>{
      console.log(err);
      if(err.error.msg){
        this.toastr.error(err.error.msg)
      }
    })
  }

  resend(){
    this._userService.resendOtp().subscribe(res=>{
      console.log('resent',res);
      this.toastr.show("OTP sent.")
      
    },err=>{
      this.toastr.error("Couldn't resned OTP now, Try again later.")
    })
  }

}
