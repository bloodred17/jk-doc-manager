import { Component, inject, OnInit } from '@angular/core';
import { ChatComponent, ChatDirection } from '../ui/chat.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ConversationService } from '../services/conversation.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogEmulatorService } from '../services/dialog-emulator.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-conversation',
  host: { class: 'z-[1] relative' },
  template: `
    <div class="p-4 h-[91vh] w-screen ">
      <div class="chat-box">
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

        @for (dialog of data; track dialog) { @switch (dialog.userID) { @case
        (conversation?.bot || 'user-1') {
        <ng-container
          [ngTemplateOutlet]="user1"
          [ngTemplateOutletContext]="{ text: dialog.message }"
        ></ng-container>
        } @case (conversation?.user || 'user-2') {
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
          [(ngModel)]="newMessage"
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
  imports: [ChatComponent, NgTemplateOutlet, NgClass, FormsModule],
  providers: [ConversationService],
})
export class ConversationComponent implements OnInit {
  activateRoute = inject(ActivatedRoute);
  conversationService = inject(ConversationService);
  dialogEmulator = inject(DialogEmulatorService);

  conversationID = 'ldkjslf92304092384';
  loading = false;
  exampleDialog = {
    conversationID: 'ldkjslf92304092384',
    userID: 'user1',
    createdAt: new Date().toISOString(),
    message: 'abcd \n def',
  };
  conversation: any;
  data: any[] = [
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
    // { ...this.exampleDialog, userID: 'user1' },
    // { ...this.exampleDialog, userID: 'user2' },
  ];
  newMessage = '';

  ngOnInit() {
    this.dialogEmulator.botDialog().subscribe((response: any) => {
      console.log(response);
      this.data = [...this.data, response];
    });

    this.activateRoute.params.subscribe((params) => {
      this.conversationID = params?.['id'];
      this.conversationService
        .getConversation(this.conversationID)
        .subscribe((response: any) => {
          console.log(response);
          this.conversation = response?.data;

          this.dialogEmulator.bot.next({
            conversationID: this.conversationID,
            userID: this.conversation?.bot,
            createdAt: new Date().toISOString(),
            message: 'Hi, How can I help you?',
          });
        });
    });
  }

  sendMessage() {
    this.loading = true;
    if (this.newMessage == '') {
      this.loading = false;
      return;
    }
    firstValueFrom(
      this.conversationService.sendMessage(
        this.conversationID,
        this.newMessage,
        this.conversation?.user
      )
    ).then((response) => {
      this.newMessage = '';
      this.loading = false;
      this.data = [...this.data, response?.data];
      console.log(response);
      this.dialogEmulator.bot.next({
        conversationID: this.conversationID,
        userID: this.conversation?.bot,
        createdAt: new Date().toISOString(),
        message: 'Bot Response',
      });
    });
  }

  protected readonly ChatDirection = ChatDirection;
}
