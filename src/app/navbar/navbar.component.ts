import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _userService:UserServiceService,private router:Router) { }

  isSigned:boolean;
  isClient:boolean

  ngOnInit() {
    this._userService.signin.subscribe(res=>{
      this.isSigned = res;
      localStorage.getItem('client')?this.isClient = true:this.isClient = false;
    })
  }
  logout(){
    this._userService.signin = false;
    localStorage.clear(); 
    this.router.navigate(['/']);
  }

}
