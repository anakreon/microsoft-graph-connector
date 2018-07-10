import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { EventService } from '../event.service';
import { Attendee } from '@microsoft/microsoft-graph-types';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MeetingTimeService } from '../meeting-time.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnDestroy {

    public eventFormGroup: FormGroup;
    public invalidMeetingTimeReason: string;
    public timeSlotConfirmation: string;
    private meetingTimesSubscription: Subscription;

    constructor (
        private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>, private eventService: EventService, 
        private meetingTimeService: MeetingTimeService
    ) { }

    public ngOnInit () {
        this.eventFormGroup = this.formBuilder.group({
            subjectCtrl: ['', Validators.required],
            contentCtrl: ['', Validators.required],
            locationCtrl: ['', Validators.required],
            dateCtrl: ['', Validators.required],
            startTimeCtrl: ['', Validators.required],
            attendeesCtrl: [''],
        });
        this.eventFormGroup.reset({
            eventSubjectCtrl: '',
            subjectCtrl: '',
            contentCtrl: '',
            locationCtrl: '',
            dateCtrl: '',
            startTimeCtrl: '',
            attendeesCtrl: ''
        });
        this.meetingTimesSubscription = this.registerMeetingTimesObservable();
    }

    public ngOnDestroy () {
        this.meetingTimesSubscription.unsubscribe();
    }

    private registerMeetingTimesObservable () {
        return combineLatest(
            this.eventFormGroup.get('dateCtrl').valueChanges,
            this.eventFormGroup.get('startTimeCtrl').valueChanges
        ).pipe(
            debounceTime(3000)
        ).subscribe(([date, startTime]) => {
            if (date && startTime) {
                this.findMeetingTimes(date, startTime);
            }
        });
    }

    private findMeetingTimes (date, startTime): any {
        const startDateTime = this.buildDateTimeObject(date, startTime);
        const endDateTime = this.addOneHour(startDateTime);
        this.meetingTimeService.findMeetingTimes(startDateTime, endDateTime).then((result) => {
            if (result.meetingTimeSuggestions.length) {
                this.invalidMeetingTimeReason = '';
                this.timeSlotConfirmation = this.buildTimeSlotConfirmation(result.meetingTimeSuggestions);
            } else {
                this.invalidMeetingTimeReason = result.emptySuggestionsReason;
                this.timeSlotConfirmation = '';
            }
        });
    }

    private buildTimeSlotConfirmation (meetingTimeSuggestions: any[]) {
        return new Date(meetingTimeSuggestions[0].meetingTimeSlot.start.dateTime + 'Z').toTimeString()
            + ' - ' + new Date(meetingTimeSuggestions[0].meetingTimeSlot.end.dateTime + 'Z').toTimeString()
            + ' available';
    }

    public closeDialog (): void {
        if (!this.eventFormGroup.invalid) {
            const subject = this.eventFormGroup.value.subjectCtrl as string;
            const content = this.eventFormGroup.value.contentCtrl as string;
            const location = this.eventFormGroup.value.locationCtrl as string;
            const date = this.eventFormGroup.value.dateCtrl as Date;
            const startTime = this.eventFormGroup.value.startTimeCtrl as string;
            const startDateTime = this.buildDateTimeObject(date, startTime);
            const endDateTime = this.addOneHour(startDateTime);
            const attendeesString = this.eventFormGroup.value.attendeesCtrl as string;
            const attendees = this.buildAttendees(attendeesString);
            const event = this.eventService.buildEvent(subject, content, startDateTime, endDateTime, location, attendees);
            this.dialogRef.close(event);
        }
    }
    private buildAttendees (attendeesString: string): Attendee[] {
        return attendeesString
            .split(';')
            .map((attendeeEmail: string) => this.eventService.buildAttendee(attendeeEmail, attendeeEmail, 'required'));
    }
    private buildDateTimeObject (date: Date, time: string) {
        const hourMinute = time.split(':');
        const newDate = new Date(date);
        newDate.setHours(parseInt(hourMinute[0]));
        newDate.setMinutes(parseInt(hourMinute[1]));
        return newDate;
    }
    private addOneHour (date: Date): Date {
        const oneHourMs = 3600000;
        return new Date(date.getTime() + oneHourMs)
    }

}
