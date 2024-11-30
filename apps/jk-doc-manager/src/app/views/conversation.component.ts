import { Component } from '@angular/core';
import { ChatComponent, ChatDirection } from '../ui/chat.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-conversation',
  host: { class: '-z-[1]' },
  template: `
    <div class="p-4 h-[91vh] relative">
      <div class="chat-box overflow-y-scroll">
        <ng-template let-text="text" #user1>
          <app-chat
            [chatDirection]="ChatDirection.Start"
            [text]="text"
            [displayAvatar]="true"
            [avatar]="{
              alt: 'abc',
              src: '/avatar-winter-penguin.svg'
            }"
          ></app-chat>
        </ng-template>
        <ng-template let-text="text" #user2>
          <app-chat
            [chatDirection]="ChatDirection.End"
            [text]="text"
            [displayAvatar]="true"
            [avatar]="{
              alt: 'abc',
              src: '/avatar-winter-girl-cat.svg'
            }"
          ></app-chat>
        </ng-template>

        @for (dialog of conversation; track dialog) { @switch (dialog.userID) {
        @case ('user1') {
        <ng-container
          [ngTemplateOutlet]="user1"
          [ngTemplateOutletContext]="{ text: dialog.message }"
        ></ng-container>
        } @case ('user2') {
        <ng-container
          [ngTemplateOutlet]="user2"
          [ngTemplateOutletContext]="{ text: dialog.message }"
        ></ng-container>
        } } }

        <!--        -->
        <div class="bottom-0 left-0 w-[100vw] px-4 invisible">
          <textarea
            class="textarea textarea-bordered w-full"
            placeholder="Ask"
          ></textarea>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 w-[100vw] p-4 flex gap-2">
        <textarea
          class="textarea textarea-bordered w-full"
          placeholder="Ask"
        ></textarea>
        <div class="flex items-center">
          <button class="btn h-full w-fit">Send</button>
        </div>
      </div>
    </div>
  `,
  imports: [ChatComponent, NgTemplateOutlet],
})
export class ConversationComponent {
  protected readonly ChatDirection = ChatDirection;
  exampleConversation = {
    conversationID: 'ldkjslf92304092384',
    userID: 'user1',
    createdAt: new Date().toISOString(),
    message: 'abcd \n def',
  };
  conversation = [
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
    { ...this.exampleConversation, userID: 'user1' },
    { ...this.exampleConversation, userID: 'user2' },
  ];
}
