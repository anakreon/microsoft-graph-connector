import { Injectable } from '@angular/core';
import { KJUR, b64utoutf8 } from 'jsrsasign';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IdtokenService {
    private readonly restApiConfig = environment.officeRestApi;

    public processIdToken (idToken: string): void {
        if (idToken && idToken.length) {
            this.getUserValuesFromToken(idToken);
        } else {
            this.clearUserState();
        }
    }
    private getUserValuesFromToken (idToken: string): void {
        const payload = this.getIdTokenPayload(idToken);
        if (this.isValidIdToken(payload)) {
            this.saveUserValues(payload);
        } else {
            this.clearUserState();
        }
        sessionStorage.authNonce = '';
    }
    private clearUserState (): void {
        sessionStorage.clear();
    }
    private saveUserValues (payload: any): void {
        sessionStorage.userDisplayName = payload.name;
        sessionStorage.userSigninName = payload.preferred_username;
        sessionStorage.userDomainType = this.isConsumerAccountId(payload.tid) ? 'consumers' : 'organizations';
    }
    private isConsumerAccountId (tid: string): boolean {
        return tid === '9188040d-6c67-4c5b-b112-36a304b66dad'
    }
    private isValidIdToken (payload: any): boolean {
        return this.hasValidNonce(payload)
            && this.isValidAppId(payload)
            && this.isValidIssuer(payload)
            && this.isValidDate(payload);
    }
    private getIdTokenPayload (idToken: string): any {
        const tokenParts = idToken.split('.');
        if (tokenParts.length === 3) {
            const header = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[0]));
            const payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenParts[1]));
            return payload;
        } else {
            throw 'Invalid format of Id Token';
        }
    }
    private hasValidNonce (payload: any): boolean {
        return payload.nonce === sessionStorage.authNonce;
    }
    private isValidAppId (payload: any): boolean {
        return payload.aud === this.restApiConfig.appId;
    }
    private isValidIssuer (payload: any): boolean {
        return payload.iss === 'https://login.microsoftonline.com/' + payload.tid + '/v2.0'
    }
    private isValidDate (payload: any): boolean {
        const fiveMinInSec = 300;
        const now = new Date();
        const notBefore = new Date((payload.nbf - fiveMinInSec) * 1000);
        const notAfter = new Date((payload.exp + fiveMinInSec) * 1000);
        return now >= notBefore && now <= notAfter;
    }
}
