import { Injectable } from '@angular/core';
import { GraphApiService } from './auth/graph-api.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';

@Injectable({
    providedIn: 'root'
})
export class MeetingTimeService {

    constructor (private graphApiService: GraphApiService) {}

    public findMeetingTimes (startDate: Date, endDate: Date): Promise<any> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.postFindMeetingTimes(client, startDate, endDate);
        });
    }

    private postFindMeetingTimes (client: MicrosoftGraph.Client, startDate: Date, endDate: Date, emailAddress: string = null): Promise<any> {
        const request  = {
            attendees: [{
                emailAddress: {
                    address: emailAddress,
                    name: emailAddress
                },
                type: 'required'
            }],
            meetingDuration: 'PT1H',
            timeConstraint: {
                timeslots: [{
                    start: {
                        dateTime: startDate.toISOString(),
                        timeZone: 'UTC'
                    },
                    end: {
                        dateTime: endDate.toISOString(),
                        timeZone: 'UTC'
                    }
                }]
            }
        };
        return new Promise ((resolve, reject) => {
            client
                .api('/me/findMeetingTimes')
                .post(request, (err, res) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

}
