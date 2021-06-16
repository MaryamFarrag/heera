import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _userService:UserServiceService,private toastr: ToastrService) { }

  ngOnInit() {
  }
  change(data){
    this._userService.changePassword(data).subscribe(res=>{
      console.log('rea',res);
      this.toastr.success("Password changed. Thank you.");
    },err=>{
      if(err.error){
        this.toastr.error(err.error.message);
      }
      else{
        this.toastr.error("Something went wrong, try again later.")
      }
    })
  }

}
