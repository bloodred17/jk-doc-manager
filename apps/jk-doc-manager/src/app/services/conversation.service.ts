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
      bot: 'llm-bot',
      user: JSON.parse(localStorage.getItem('user') || '{}')?.uid,
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

  sendMessage(conversationId: string, message: string, userId: string) {
    // send logic here
    return new Observable((observer: Observer<any>) => {
      observer.next({
        success: true,
        data: {
          conversationID: conversationId,
          userID: userId,
          createdAt: new Date().toISOString(),
          message: message,
        },
      });
    });
  }
}
