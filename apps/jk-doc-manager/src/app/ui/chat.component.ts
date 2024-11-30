import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export enum ChatDirection {
  Start = 'chat-start',
  End = 'chat-end',
}

@Component({
  standalone: true,
  selector: 'app-chat',
  template: `
    <div class="relative chat z-0" [ngClass]="chatDirection">
      @if (avatar && displayAvatar) {
      <div class="chat-image avatar">
        <div class="w-12 p-1 rounded-full border">
          <img [alt]="avatar.alt" [src]="avatar.src" />
        </div>
      </div>
      }
      <div class="chat-bubble">{{ text }}</div>
    </div>
  `,
  imports: [NgClass],
})
export class ChatComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) chatDirection!: ChatDirection;
  @Input() displayAvatar = false;
  @Input() avatar!: { alt: string; src: string };
}
