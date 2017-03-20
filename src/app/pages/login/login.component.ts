import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router'
import {Angular2TokenService} from "angular2-token";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginFrom:NgForm;

  constructor(
      protected authService:Angular2TokenService,
      protected router:Router,
      protected notifications:NotificationService
  ) {}

  ngOnInit() {
    if(this.authService.userSignedIn()) this.router.navigate(['/books'])
  }

  onLogin(){
    let user = {
      email:  this.loginFrom.controls['email'].value,
      password:  this.loginFrom.controls['password'].value
    };


    this.authService.signIn(user).subscribe(
        res => {
          console.log("login result ", res);
          if(res.status == 200){
            this.router.navigate(['/books']);
          }
        },

        err => {
          // alert(err.json().errors)
          this.notifications.error(err.json().errors, "Login error")
        }

    );
  }

}
