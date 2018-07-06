import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTabsModule, MatToolbarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MailsComponent } from './mails/mails.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        NavbarComponent,
        MeetingsComponent,
        MailsComponent,
        EditMeetingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
            useValue: {
                duration: 5000,
                verticalPosition: 'top'
            }
        }
    ],
    entryComponents: [EditMeetingComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
