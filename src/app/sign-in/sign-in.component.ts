import {AfterViewInit, Component, ElementRef, NgZone} from '@angular/core';
import {Router} from "@angular/router";

declare const gapi: any;

@Component({
    selector: 'app-sign-in',
    template: `<button id="googleSignIn" (click)="signIn()">Sign in</button>`,
    styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements AfterViewInit {

    private clientId = '189701995086-4r32t9cfn3j51dn854pg8v0up9fm21a2.apps.googleusercontent.com';
    private scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/contacts.readonly',
        'https://www.googleapis.com/auth/admin.directory.user.readonly',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.scripts',
        'https://www.googleapis.com/auth/drive.metadata'
    ].join(' ');
    private auth2: any;


    constructor(private ngZone: NgZone, private elementRef: ElementRef, private router: Router) {
    }

    ngAfterViewInit() {
        setTimeout(() => this.signIn(), 1000);
    }

    signIn() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.clientId,
                cookie_policy: 'single_host_origin',
                scope: this.scope
            });
            this.auth2.attachClickHandler(this.elementRef.nativeElement.firstChild, {},
                (googleUser) => {
                    localStorage.setItem('token', googleUser.getAuthResponse().access_token);
                    this.ngZone.run(() => this.router.navigate(['/home']).then());
                },
                (error) => console.log(error));
        });
    }
}
