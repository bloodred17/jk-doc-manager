import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, Observer } from 'rxjs';

@Injectable()
export class ConversationService {
  constructor(private http: HttpClient) {}

  getConversations() {
    return [];
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
