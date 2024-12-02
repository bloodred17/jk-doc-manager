import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogEmulatorService {
  constructor() {}

  bot = new Subject();

  botResponse(conversationId: string, message: string) {
    return {
      conversationID: conversationId,
      userID: 'llm-bot',
      createdAt: new Date().toISOString(),
      message: message,
    };
  }

  botDialog() {
    return this.bot.asObservable();
  }
}
