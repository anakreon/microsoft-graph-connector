import { Injectable } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { AccessTokenService } from './access-token.service';

@Injectable({
    providedIn: 'root'
})
export class GraphApiService {

    constructor (private accessTokenService: AccessTokenService) {}

    public getGraphApiClient (): Promise<MicrosoftGraph.Client> {
        return this.getAccessToken().then((accessToken: string) => {
            return this.initializeGraphApiClient(accessToken);
        });
    }

    private getAccessToken (): Promise<string> {
        return this.accessTokenService.getAccessToken();
    }

    private initializeGraphApiClient (accessToken: string): MicrosoftGraph.Client {
        return MicrosoftGraph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
    }

}
