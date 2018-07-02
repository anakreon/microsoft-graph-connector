import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor (authService: AuthService, router: Router) {
        const tokenresponse = this.parseHashParams(location.hash);
        authService.loginWithResponse(tokenresponse);
        router.navigate(['/dashboard']);
    }

    private parseHashParams (hash): any {
        const params = hash.slice(1).split('&');
        const paramarray = {};
        params.forEach((param) => {
            param = param.split('=');
            paramarray[param[0]] = param[1];
        });
        return paramarray;
    }

}
