import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {FilesService} from "./home/files.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PaginationComponent } from './pagination/pagination.component';
import {InterceptorService} from "./interceptor.service";

const routes: Routes = [
    {path: '', component: SignInComponent},
    {path: 'home', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignInComponent,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        FilesService,
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
