import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Event } from '@microsoft/microsoft-graph-types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public authUrl: string;
    public tokenExpireDate: Date;
    public token: string;
    public meetings: Event[];

    constructor (private authService: AuthService) {}

    public isUserLoggedIn () {
        return this.authService.isAuthenticated();
    }

}
