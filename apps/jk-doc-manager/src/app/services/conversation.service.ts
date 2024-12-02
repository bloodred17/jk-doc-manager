import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly domain = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createNewConversation(filename: string) {
    return this.http.post(this.domain + '/api/conversation', {
      name: 'New Conversation',
      description: 'New Conversation Description',
      file: filename,
    });
  }

  getConversations() {
    return this.http.get(this.domain + '/api/conversation');
  }

  getConversation(id: string) {
    return this.http.get(this.domain + '/api/conversation/' + id);
  }

  deleteConversation(id: string) {
    return this.http.delete(this.domain + '/api/conversation/' + id);
  }

  sendMessage(conversationId: string) {
    // send logic here

    return new Observable((observer: Observer<any>) => {
      observer.next({
        conversationID: 'ldkjslf92304092384',
        userID: 'user2342',
        createdAt: new Date().toISOString(),
        message: 'abcd \n defdfasf',
      });
    }).pipe(delay(30000));
  }
}
