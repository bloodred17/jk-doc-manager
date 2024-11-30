import { Component } from '@angular/core';
import { ChatComponent, ChatDirection } from '../ui/chat.component';

@Component({
  standalone: true,
  selector: 'app-conversation',
  template: `
    <div class="p-4 h-[91vh] relative">
      <app-chat
        [chatDirection]="ChatDirection.Start"
        [text]="'hello world'"
        [displayAvatar]="true"
        [avatar]="{
          alt: 'abc',
          src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
        }"
      ></app-chat>
      <app-chat
        [chatDirection]="ChatDirection.End"
        [text]="'hello world'"
      ></app-chat>

      <div class="absolute bottom-0 left-0 w-[100vw] px-4">
        <textarea
          class="textarea textarea-bordered w-full"
          placeholder="Ask"
        ></textarea>
      </div>
    </div>
  `,
  imports: [ChatComponent],
})
export class ConversationComponent {
  protected readonly ChatDirection = ChatDirection;
}
