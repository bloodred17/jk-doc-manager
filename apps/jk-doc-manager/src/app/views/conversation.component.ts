import { Component, inject } from '@angular/core';
import { ChatComponent, ChatDirection } from '../ui/chat.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ConversationService } from '../services/conversation.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-conversation',
  host: { class: '-z-[1] relative' },
  template: `
    <div class="p-4 h-[91vh] w-screen ">
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
        <div class="bottom-0 left-0 w-[100vw] p-4 invisible">
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
          <button
            class="btn h-full w-fit sm:w-36 gap-2"
            [ngClass]="{ 'btn-disabled': loading }"
            (click)="sendMessage()"
          >
            @if (loading) {
            <div class="flex justify-center items-center">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            }
            <span [ngClass]="{ 'hidden sm:block': loading }"> Send </span>
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [ChatComponent, NgTemplateOutlet, NgClass],
  providers: [ConversationService],
})
export class ConversationComponent {
  conversationService = inject(ConversationService);
  conversationID = 'ldkjslf92304092384';
  loading = false;
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
  newMessage = '';

  sendMessage() {
    this.loading = true;
    firstValueFrom(
      this.conversationService.sendMessage(this.conversationID)
    ).then((response) => {
      this.loading = false;
      console.log(response);
    });
  }

  protected readonly ChatDirection = ChatDirection;
}
