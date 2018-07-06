import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EmailsService } from '../emails.service';
import { Message } from '@microsoft/microsoft-graph-types';

@Component({
    selector: 'app-mails',
    templateUrl: './mails.component.html',
    styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {

    public emails: Message[] = [];

    constructor (private emailsService: EmailsService, public snackBar: MatSnackBar) {}

    ngOnInit () {
        this.getEmails();
    }

    private getEmails () {
        return this.emailsService.getEmails()
            .then((emails: any[]) => {
                this.emails = emails;
            })
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

    public markAsUnread (email: Message) {
        return this.emailsService.markAsUnread(email.id)
            .then(() => this.getEmails())
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

}
