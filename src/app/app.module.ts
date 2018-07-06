import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatSnackBarModule, MatToolbarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { MeetingsComponent } from './meetings/meetings.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        NavbarComponent,
        MeetingsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatToolbarModule
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
    bootstrap: [AppComponent]
})
export class AppModule { }
