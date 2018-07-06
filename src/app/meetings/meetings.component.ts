import { Component, OnInit } from '@angular/core';
import { GraphApiService } from '../graph-api.service';
import { Event } from '@microsoft/microsoft-graph-types';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-meetings',
    templateUrl: './meetings.component.html',
    styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

    public meetings: Event[] = [];

    constructor (private graphApiService: GraphApiService, public snackBar: MatSnackBar) {}

    ngOnInit () {
        this.getCalendarMeetings();
    }

    private getCalendarMeetings () {
        return this.graphApiService.getCalendarMeetings()
            .then((meetings: Event[]) => {
                this.meetings = meetings;
            })
            .catch((error: string) => {
                this.snackBar.open(error);
            });
    }
}
