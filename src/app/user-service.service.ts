import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'http://74.208.206.25:8080/api'
  constructor(public http: HttpClient) { }

  emailExists(email){
    return this.http.post(`${this.url}/checkemail`,{email:email})
  }

  signUpPartner(data){
    var headerss = new HttpHeaders();
    let content = new FormData;

    // headers.set('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    headerss = headerss.set('Access-Control-Allow-Origin','*');


    content.append('first_name',data.first_name);
    content.append('last_name',data.last_name);
    content.append('email',data.email);
    content.append('password',data.password);
    content.append('contact',data.number);
    content.append('city',data.city);

    return this.http.post(`${this.url}/registervendor`,content)
  }

  signUpClient(data){
    let content = new FormData;

    content.append('first_name',data.first_name);
    content.append('last_name',data.last_name);
    content.append('email',data.email);
    content.append('password',data.password);
    content.append('contact',data.number);
    content.append('city',data.city);

    return this.http.post(`${this.url}/registerclient`,content)
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
    return this.http.post(`${this.url}/resendotp`,content);
  }

  signinEmployee(data){
    let content = new FormData;

    content.append('email',data.email);
    content.append('password',data.password);
    return this.http.post(`${this.url}/emplyeeLogin`,content)

  }

  signinEmployer(data){
    let content = new FormData;

    content.append('email',data.email);
    content.append('password',data.password);
    return this.http.post(`${this.url}/employerLogin`,content)

  }
}
