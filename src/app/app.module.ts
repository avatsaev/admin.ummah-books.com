// external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { ReactiveFormsModule } from "@angular/forms";
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { AppRoutingModule } from "./app-routing.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ng2-tag-input';


import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader } from 'ng2-translate';

export function createTranslateLoader( http: Http ) {
    return new TranslateStaticLoader(
        http,
        '../public/assets/i18n',
        '.json'
    );
}

let modules = [
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    CKEditorModule,
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule,
    TagInputModule,
    AppRoutingModule
];

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './widgets/app-header';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';

let widgets = [
    AppComponent,
    BreadcrumbComponent,
    AppHeaderComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent
];

import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AdminLTETranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';
import { Angular2TokenService } from 'angular2-token';
import {BooksService} from "./services/books.service";

let services = [
    UserService,
    BreadcrumbService,
    MessagesService,
    CanActivateGuard,
    NotificationService,
    AdminLTETranslateService,
    LoggerService,
    Angular2TokenService,
    BooksService,
    ChaptersService,
    TagsService,
];

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {
    BookFormComponent,
    BookEditComponent,
    BookNewComponent,
    BookDetailsComponent,
    BookListComponent } from './pages/books/';
import {ChaptersService} from "./services/chapters.service";
import {TagsService} from "./services/tags.service";





let pages = [
    HomeComponent,
    BookListComponent,
    BookDetailsComponent,
    BookNewComponent,
    BookEditComponent,
    BookFormComponent,
    LoginComponent,
];

// main bootstrap


@NgModule( {
    bootstrap: [AppComponent],
    declarations: [
        ...widgets,
        ...pages
    ],
    imports: [
        ...modules
    ],
    providers: [
        ...services
    ]
})
export class AppModule { }
