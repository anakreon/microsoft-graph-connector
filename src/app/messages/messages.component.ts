import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessageService } from '../message.service';
import { Message } from '@microsoft/microsoft-graph-types';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    public messages: Message[] = [];

    constructor (private messageService: MessageService, public snackBar: MatSnackBar) {}

    ngOnInit () {
        this.getMessages();
    }

    private getMessages () {
        return this.messageService.getMessages()
            .then((messages: any[]) => {
                this.messages = messages;
            })
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

    public markAsUnread (message: Message) {
        return this.messageService.markAsUnread(message.id)
            .then(() => this.getMessages())
            .catch((error: string) => {
                console.log(error);
                this.snackBar.open(error);
            });
    }

}
