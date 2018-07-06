import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-meeting',
    templateUrl: './edit-meeting.component.html',
    styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

    public meetingSubjectFormGroup: FormGroup;

    constructor (private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    public ngOnInit () {
        this.meetingSubjectFormGroup = this.formBuilder.group({
            meetingSubjectCtrl: ['', Validators.required]
        });
        this.meetingSubjectFormGroup.reset({
            meetingSubjectCtrl: this.data ? this.data.oldSubject : ''
        });
    }

    public closeDialog (): void {
        if (!this.meetingSubjectFormGroup.invalid) {
            const meetingSubject = this.meetingSubjectFormGroup.value.meetingSubjectCtrl as string;
            this.dialogRef.close(meetingSubject);
        }
    }

}
