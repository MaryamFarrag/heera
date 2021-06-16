import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ClientComponent } from './profile/client/client.component';
import { PartnerComponent } from './profile/partner/partner.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'profile/client', component: ClientComponent },
  { path: 'profile/partner', component: PartnerComponent },
  { path: 'profile/change-password', component:ChangePasswordComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
