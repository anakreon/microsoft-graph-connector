import { Injectable } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { Event } from '@microsoft/microsoft-graph-types';
import { AccessTokenService } from './access-token.service';

@Injectable({
    providedIn: 'root'
})
export class GraphApiService {

    constructor (private accessTokenService: AccessTokenService) {}

    public getCalendarMeetings (): Promise<Event[]> {
        return this.getGraphApiClient().then((client) => {
            return this.queryMeetings(client);
        });
    }

    private getGraphApiClient (): Promise<MicrosoftGraph.Client> {
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

    private queryMeetings (client: MicrosoftGraph.Client): Promise<Event[]> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/events')
                .top(5)
                .select('id, subject, start, end, attendees, bodyPreview, location, organizer')
                .filter('start/dateTime ge \'' + (new Date()).toISOString() + '\'')
                .orderby('start/dateTime ASC')
                .get((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res && res.value);
                    }
                });
        });
    }
}
