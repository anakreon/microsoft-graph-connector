import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatNativeDateModule,  MatSnackBarModule, MatTabsModule, MatToolbarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventsComponent } from './events/events.component';
import { MessagesComponent } from './messages/messages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
    imports: [
        AuthModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        EventsComponent,
        MessagesComponent,
        EditEventComponent,
        CreateEventComponent
    ],
    providers: [{
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
        useValue: {
            duration: 5000,
            verticalPosition: 'top'
        }
    }],
    entryComponents: [CreateEventComponent, EditEventComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
