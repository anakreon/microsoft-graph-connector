import { Component, OnInit } from '@angular/core';
import { Event } from '@microsoft/microsoft-graph-types';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EventService } from '../event.service';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    public events: Event[] = [];

    constructor (private eventService: EventService, public snackBar: MatSnackBar, private dialog: MatDialog) {}

    ngOnInit () {
        this.getCalendarEvents();
    }

    private getCalendarEvents () {
        return this.eventService.getCalendarEvents()
            .then((events: Event[]) => {
                this.events = events;
            })
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

    public getEventDate (event: Event): string {
        return new Date(event.start.dateTime + 'Z').toString();
    }

    public editSubject (event: Event): void {
        this.showSubjectDialog(event.subject)
            .then((newSubject: string) => this.eventService.updateEventSubject(event.id, newSubject))
            .then(() => this.getCalendarEvents())
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }
    private showSubjectDialog (oldSubject: string) {
        const dialogRef = this.dialog.open(EditEventComponent, {
            height: '265px',
            width: '270px',
            data: { oldSubject }
        });
        return dialogRef.afterClosed().toPromise();
    }

    public createEvent () {
        this.createEventDialog().then((event: Event) => {
            if (event) {
                this.doCreateEvent(event);
            }
        });
    }
    private createEventDialog (): Promise<Event> {
        const dialogRef = this.dialog.open(CreateEventComponent, {
            height: '650px',
            width: '700px'
        });
        return dialogRef.afterClosed().toPromise();
    }
    private doCreateEvent (event: Event) {
        return this.eventService.createEvent(event)
            .then(() => this.getCalendarEvents())
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }
}
