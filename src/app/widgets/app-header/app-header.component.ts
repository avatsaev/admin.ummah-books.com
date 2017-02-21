import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Angular2TokenService} from "angular2-token";


@Component( {
    selector: 'app-header',
    styleUrls: ['./app-header.component.css'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(protected authService:Angular2TokenService, protected router:Router) {
    // TODO
  }


  onLogout(){
    this.authService.signOut().subscribe( (res) => {

      if(res.status == 200) this.router.navigate(['/login'])

    });
  }

}
