import { Component, OnInit } from '@angular/core';
import { OfficeRestApiService } from '../office-rest-api.service';
import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
import { Event } from '@microsoft/microsoft-graph-types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public authUrl: string;
    public tokenExpireDate: Date;
    public token: string;
    public meetings: Event[];

    constructor (
        private officeRestApiService: OfficeRestApiService, private authService: AuthService, private accessTokenService: AccessTokenService
    ) {}

    ngOnInit () {
        this.updateAccessToken().then((token: string) => {
            this.token = token;
            this.getCalendarMeetings(token);
        });
        if (this.isUserLoggedIn()) {
            this.tokenExpireDate = new Date(parseInt(sessionStorage.tokenExpires));
        }
    }

    private getCalendarMeetings (token: string) {
        return this.officeRestApiService.getCalendarMeetings(token).then((meetings: Event[]) => {
            this.meetings = meetings;
        });
    }

    public authenticate () {
        const authUrl = this.authService.buildAuthUrl();
        window.open(authUrl, '_self');
    }

    public logout () {
        this.authService.logout();
    }

    public isUserLoggedIn () {
        return this.authService.isAuthenticated();
    }

    public getUsername () {
        return sessionStorage.userDisplayName;
    }

    private updateAccessToken (): Promise<string> {
        return this.accessTokenService.getAccessToken();
    }

}
