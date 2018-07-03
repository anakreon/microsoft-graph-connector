import { Injectable } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { Event } from '@microsoft/microsoft-graph-types';

@Injectable({
    providedIn: 'root'
})
export class OfficeRestApiService {

    public getCalendarMeetings (token: string): Promise<any> {
        const client = this.connectToGraphApi(token);
        return this.queryMeetings(client);
    }

    private connectToGraphApi (token: string): MicrosoftGraph.Client {
        return MicrosoftGraph.Client.init({
            authProvider: (done) => {
                done(null, token);
            }
        });
    }

    private queryMeetings (client: MicrosoftGraph.Client): Promise<Event[]> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/events')
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
