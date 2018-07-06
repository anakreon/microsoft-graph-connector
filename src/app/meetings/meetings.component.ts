import { Component, OnInit } from '@angular/core';
import { Event } from '@microsoft/microsoft-graph-types';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MeetingsService } from '../meetings.service';
import { EditMeetingComponent } from '../edit-meeting/edit-meeting.component';

@Component({
    selector: 'app-meetings',
    templateUrl: './meetings.component.html',
    styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

    public meetings: Event[] = [];

    constructor (private meetingsService: MeetingsService, public snackBar: MatSnackBar, private dialog: MatDialog) {}

    ngOnInit () {
        this.getCalendarMeetings();
    }

    private getCalendarMeetings () {
        return this.meetingsService.getCalendarMeetings()
            .then((meetings: Event[]) => {
                this.meetings = meetings;
            })
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

    public editSubject (meeting: Event): void {
        this.showSubjectDialog(meeting.subject)
            .then((newSubject: string) => this.meetingsService.updateMeetingSubject(meeting.id, newSubject))
            .then(() => this.getCalendarMeetings())
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }
    private showSubjectDialog (oldSubject: string) {
        const dialogRef = this.dialog.open(EditMeetingComponent, {
            height: '265px',
            width: '270px',
            data: { oldSubject }
        });
        return dialogRef.afterClosed().toPromise();
    }
}
