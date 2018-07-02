import { Component, OnInit } from '@angular/core';
import { OfficeRestApiService } from '../office-rest-api.service';
import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public authUrl: string;
    public tokenExpireDate: Date;
    public token: string;

    constructor (private officeRestApiService: OfficeRestApiService, private authService: AuthService, private accessTokenService: AccessTokenService) {}

    ngOnInit () {
        this.officeRestApiService.getCalendarMeetings();
        this.updateAccessToken();
        if (this.isUserLoggedIn()) {
            this.tokenExpireDate = new Date(parseInt(sessionStorage.tokenExpires));
        }
    }

    public authenticate () {
        const authUrl = this.authService.buildAuthUrl();
        window.open(authUrl, '_self');
    }

    public isUserLoggedIn () {
        return this.authService.isAuthenticated();
    }

    public getUsername () {
        return sessionStorage.userDisplayName;
    }

    private updateAccessToken () {
        this.accessTokenService.getAccessToken().then((token: string) => {
            this.token = token;
        });
    }

}
