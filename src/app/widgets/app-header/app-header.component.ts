import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import {Angular2TokenService} from "angular2-token";

@Component( {
    selector: 'app-header',
    styleUrls: ['./app-header.component.css'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(protected authService:Angular2TokenService) {
    // TODO
  }

  loginUser(){
    this.authService.signIn({
      email: 'root@example.com',
      password: "monkey67"
    }).subscribe(
        res => {
          console.log("login result ", res);
        },

        err => {
          console.error("login fail: ", err);
        }

    );
  }
}
