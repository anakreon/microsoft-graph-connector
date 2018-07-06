import { Injectable } from '@angular/core';
import { GraphApiService } from './graph-api.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { Event } from '@microsoft/microsoft-graph-types';

@Injectable({
    providedIn: 'root'
})
export class MeetingsService {

    constructor (private graphApiService: GraphApiService) {}

    public getCalendarMeetings (): Promise<Event[]> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.queryMeetings(client);
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
                        reject(err.message);
                    } else {
                        resolve(res && res.value);
                    }
                });
        });
    }

    public updateMeetingSubject (meetingId: string, subject: string): Promise<void> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.patchMeetingSubject(client, meetingId, subject);
        });
    }

    private patchMeetingSubject (client: MicrosoftGraph.Client, meetingId: string, subject: string): Promise<void> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/events/' + meetingId)
                .patch({ subject }, (err, res) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve();
                    }
                });
        });
    }
}
