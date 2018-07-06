import { Injectable } from '@angular/core';
import { GraphApiService } from './graph-api.service';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { Message } from '@microsoft/microsoft-graph-types';

@Injectable({
    providedIn: 'root'
})
export class EmailsService {

    constructor (private graphApiService: GraphApiService) {}

    public getEmails (): Promise<Message[]> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.queryEmails(client);
        });
    }

    private queryEmails (client: MicrosoftGraph.Client): Promise<Message[]> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/messages')
                .top(5)
                .select('id, subject, from, sender, toRecipients, ccRecipients, bccRecipients, receivedDateTime, bodyPreview')
                .orderby('receivedDateTime DESC')
                .get((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res && res.value);
                    }
                });
        });
    }

    public markAsUnread (messageId: string): Promise<void> {
        return this.graphApiService.getGraphApiClient().then((client) => {
            return this.patchAsUnread(client, messageId);
        });
    }

    private patchAsUnread (client: MicrosoftGraph.Client, messageId: string): Promise<void> {
        return new Promise ((resolve, reject) => {
            client
                .api('/me/messages/' + messageId)
                .patch({ isRead: false }, (err, res) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve();
                    }
                });
        });
    }
}
