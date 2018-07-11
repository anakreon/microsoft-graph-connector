import { Injectable } from '@angular/core';
import { GraphApiService } from './auth/graph-api.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { Event, Attendee, AttendeeType } from '@microsoft/microsoft-graph-types';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor (private graphApiService: GraphApiService) {}

    public getCalendarEvents (): Promise<Event[]> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.queryEvents(client);
        });
    }

    private queryEvents (client: MicrosoftGraph.Client): Promise<Event[]> {
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

    public updateEventSubject (eventId: string, subject: string): Promise<void> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.patchEventSubject(client, eventId, subject);
        });
    }

    private patchEventSubject (client: MicrosoftGraph.Client, eventId: string, subject: string): Promise<void> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/events/' + eventId)
                .patch({ subject }, (err, res) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve();
                    }
                });
        });
    }

    public buildAttendee (name: string, emailAddress: string, type: AttendeeType) {
        return {
            emailAddress: {
                address: emailAddress,
                name
            },
            type: type
        };
    }

    public buildEvent (subject: string, content: string, startTime: Date, endTime: Date, location: string, attendees: Attendee[]): Event {
        return {
            subject,
            body: {
                contentType: 'html',
                content
            },
            start: {
                dateTime: startTime.toUTCString(),
                timeZone: 'UTC'
            },
            end: {
                dateTime: endTime.toUTCString(),
                timeZone: 'UTC'
            },
            location: {
                displayName: location
            },
            attendees,
            responseRequested: false
        };
    }

    public createEvent (event: Event) {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.postEvent(client, event);
        });
    }

    private postEvent (client: MicrosoftGraph.Client, event: Event): Promise<void>  {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/events/')
                .post(event, (err, res) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(res.id);
                    }
                });
        });
    }
}
