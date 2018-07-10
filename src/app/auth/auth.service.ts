import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IdtokenService } from './idtoken.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly restApiConfig = environment.officeRestApi;

    constructor (private idtokenService: IdtokenService) {}

    public isAuthenticated (): boolean {
        return sessionStorage.accessToken && sessionStorage.accessToken.length > 0;
    }

    public loginWithResponse (tokenresponse: any): void {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('loginRequired');

        if (this.isValidTokenResponse(tokenresponse)) {
            sessionStorage.authState = '';
            sessionStorage.accessToken = tokenresponse.access_token;
            sessionStorage.tokenExpires = this.getTokenExpireTime(tokenresponse);
            sessionStorage.idToken = tokenresponse.id_token;
            this.idtokenService.processIdToken(tokenresponse.id_token);
        } else {
            sessionStorage.removeItem('authState');
            sessionStorage.removeItem('authNonce');
            sessionStorage.loginRequired = true;
        }
    }

    private isValidTokenResponse (tokenresponse: any): boolean {
        return this.hasValidAuthState(tokenresponse)
            && !this.isLoginRequiredErrorResponse(tokenresponse);
    }

    private hasValidAuthState (tokenresponse: any): boolean {
        return tokenresponse.state === sessionStorage.authState;
    }

    private isLoginRequiredErrorResponse (tokenresponse: any): boolean {
        return tokenresponse.error === 'login_required';
    }

    private getTokenExpireTime (tokenresponse): number {
        const expiresin = (parseInt(tokenresponse.expires_in) - 300) * 1000;
        const now = new Date();
        const expireDate = new Date(now.getTime() + expiresin);
        return expireDate.getTime();
    }

    public isLoginRequired (): boolean {
        return sessionStorage.loginRequired;
    }

    public logout (): void {
        sessionStorage.clear();
    }

    public buildAuthUrl (): string {
        this.generateAuthenticationState();
        const authEndpoint = this.restApiConfig.authEndpoint;
        const authParams = {
            response_type: 'id_token token',
            client_id: this.restApiConfig.appId,
            redirect_uri: this.restApiConfig.redirectUrl,
            scope: this.restApiConfig.scopes,
            state: sessionStorage.authState,
            nonce: sessionStorage.authNonce,
            response_mode: 'fragment'
        };
        return authEndpoint + this.stringifyGetParams(authParams);
    }

    private generateAuthenticationState () {
        sessionStorage.authState = this.guid();
        sessionStorage.authNonce = this.guid();
    }

    private guid (): string {
        const buf = new Uint16Array(8);
        window.crypto.getRandomValues(buf);
        return this.s4(buf[0]) + this.s4(buf[1]) + '-' + this.s4(buf[2]) + '-' + this.s4(buf[3]) + '-'
            + this.s4(buf[4]) + '-' + this.s4(buf[5]) + this.s4(buf[6]) + this.s4(buf[7]);
    }

    private s4 (num: number): string {
        let ret = num.toString(16);
        while (ret.length < 4) {
            ret = '0' + ret;
        }
        return ret;
    }

    private stringifyGetParams (params): string {
        return Object.keys(params).reduce((accumulator: string, key: string) => {
            return accumulator + (((accumulator !== '') ? '&' : '') + key + '=' + encodeURIComponent(params[key]));
        }, '');
    }
}
