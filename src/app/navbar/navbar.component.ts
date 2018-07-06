import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor (private authService: AuthService) { }

    public isUserLoggedIn () {
        return this.authService.isAuthenticated();
    }

    public getUsername () {
        return sessionStorage.userDisplayName;
    }

    public login () {
        const authUrl = this.authService.buildAuthUrl();
        window.open(authUrl, '_self');
    }

    public logout () {
        this.authService.logout();
    }

}
