import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AccessTokenService {

    constructor (private authService: AuthService) {}

    public getAccessToken (): Promise<string> {
        if (sessionStorage.accessToken && !this.isTokenExpired()) {
            return Promise.resolve(sessionStorage.accessToken);
        } else {
            return this.getRenewedAccessToken();
        }
    }

    private isTokenExpired (): boolean {
        const now = new Date().getTime();
        return now > parseInt(sessionStorage.tokenExpires);
    }

    private getRenewedAccessToken (): Promise<string> {
        return new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', this.buildAuthUrl());
            iframe.setAttribute('style', 'display: none');
            iframe.onload = () => {
                resolve(sessionStorage.accessToken);
                iframe.remove();
            };
            document.body.appendChild(iframe);
        });
    }

    private buildAuthUrl () {
        return this.authService.buildAuthUrl()
            + '&prompt=none'
            + '&domain_hint=' + sessionStorage.userDomainType
            + '&login_hint=' + sessionStorage.userSigninName;
    }
}