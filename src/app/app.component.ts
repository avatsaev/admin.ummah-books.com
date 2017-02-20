import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { LoggerService } from './services/logger.service';
import { Message } from './models/message';
import { MessagesService } from './services/messages.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from './services/translate.service';
import {Angular2TokenService} from "angular2-token";


@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private toastrConfig: ToasterConfig;
    private logger: LoggerService;
    private sidebarLinks: Array<any> = [];

    constructor(
                 private msgServ: MessagesService,
                 private toastr: ToasterService,
                 private translate: AdminLTETranslateService,
                 private authService:Angular2TokenService )
    {

        this.toastrConfig = new ToasterConfig( {
            newestOnTop: true,
            showCloseButton: true,
            tapToDismiss: false
        });


        // this.translate = translate.getTranslate();
        // this.logger = new LoggerService( this.translate );
    }

    public ngOnInit() {
        //  sedding the resize event, for AdminLTE to place the height



        // define here your own links menu structure
        this.sidebarLinks = [
          {
            'title': 'Home',
            'icon': 'dashboard',
            'link': ['/']
          },

          {
            'title': 'Books',
            'icon': 'link',
            'sublinks': [
              {
                'title': 'List',
                'link': ['books'],
              },
              {
                'title': 'Add',
                'link': ['books', 'new'],
              }
            ]
          }

          // {
          //   'title': 'Sub menu',
          //   'icon': 'link',
          //   'sublinks': [
          //     {
          //       'title': 'Page 2',
          //       'link': ['/page/2'],
          //     },
          //     {
          //       'title': 'Page 3',
          //       'link': ['/page/3'],
          //     }
          //   ]
          // },
          // {
          //   'title': 'External Link',
          //   'icon': 'google',
          //   'link': ['http://google.com'],
          //   'external': true,
          //   'target': '_blank'
          // }
        ];

        // sending a test message
        // this.msgServ.addMessage( new Message( {
        //     author: user2,
        //     content: 'le contenu d\'un message d\'une importance extreme',
        //     destination: user1,
        //     title: 'un message super important'
        // }) );
    }


}
