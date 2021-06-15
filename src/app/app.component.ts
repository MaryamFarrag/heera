import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router,private _userService:UserServiceService){
    if(localStorage.getItem('token')){
      this._userService.signin = true;
    }
    
  }

  title = 'HeeraTechnologies';

}
