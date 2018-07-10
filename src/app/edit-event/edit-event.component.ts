import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

    public eventSubjectFormGroup: FormGroup;

    constructor (private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    public ngOnInit () {
        this.eventSubjectFormGroup = this.formBuilder.group({
            eventSubjectCtrl: ['', Validators.required]
        });
        this.eventSubjectFormGroup.reset({
            eventSubjectCtrl: this.data ? this.data.oldSubject : ''
        });
    }

    public closeDialog (): void {
        if (!this.eventSubjectFormGroup.invalid) {
            const eventSubject = this.eventSubjectFormGroup.value.eventSubjectCtrl as string;
            this.dialogRef.close(eventSubject);
        }
    }

}
