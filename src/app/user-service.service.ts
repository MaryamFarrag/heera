import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'http://104.225.143.200:8080/api';

  isSigned;
  constructor(public http: HttpClient) {
    this.isSigned = new BehaviorSubject(localStorage.getItem('heera_token'));
   }

   set signin(val){
    this.isSigned.next(val); 
  }
  get signin(){
    return this.isSigned;
  }

  emailExists(email){
    return this.http.post(`${this.url}/checkregisteredmail`,{email:email})
  }

  signUp(data){
    let content = new FormData;

    content.append('first_name',data.first_name);
    content.append('last_name',data.last_name);
    content.append('email',data.email);
    content.append('password',data.password);
    content.append('phone_no',data.number);
    content.append('city',data.city);
    content.append('user_type',data.userType);

    return this.http.post(`${this.url}/registeruser`,content)
  }

  sendOtp(otp){
    let email = localStorage.getItem('email');
    let content = new FormData;
    content.append('email',email);
    content.append('otp',otp);
    return this.http.post(`${this.url}/checkotp`,content);
  }

  resendOtp(){
    let email = localStorage.getItem('email');
    let content = new FormData;
    content.append('email',email);
    return this.http.post(`${this.url}/resendemail`,content);
  }

  login(data){
    let content = new FormData;

    content.append('email',data.email);
    content.append('password',data.password);
    return this.http.post(`${this.url}/login`,content)

  }

  forgotPass(data){
    return this.http.post(`${this.url}/resetpassword/`,{email:data.email})
  }

  changePassword(data){
    return this.http.post(`${this.url}/changepassword/`,{password:data.password,email:localStorage.getItem('email')})

  }
}
