import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConversationService } from '../services/conversation.service';

@Component({
  standalone: true,
  selector: 'app-conversation-history',
  template: `
    <div class="flex justify-center p-2 sm:p-4 md:p-12">
      <div class="card  sm:w-[60vw] shadow">
        <ul class="card-body">
          @for (row of conversations(); track row) {
          <li class="flex justify-between group">
            <a
              class="w-full cursor-pointer rounded-sm p-4 group-hover:bg-base-200 rounded-xl"
            >
              <div class="sm:flex justify-between w-full">
                <div
                  class="text-2xl font-inter border-b border-b-transparent group-hover:border-b-secondary border-b-2 transition-all delay-75"
                >
                  {{ row.name }}
                </div>
                <div
                  class="font-mono text-primary group-hover:text-secondary self-center"
                >
                  {{ row.file }}
                </div>
              </div>
              <div class="text-sm text-gray-400 mt-0.5">
                {{ row?.updatedAt | date : "MMM dd, yyyy 'at' hh:mm a" }}
              </div>
            </a>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
  imports: [DatePipe],
})
export class ConversationHistoryComponent implements OnInit {
  conversationService = inject(ConversationService);
  conversations = signal<any[]>([]);
  ngOnInit() {
    this.conversationService
      .getConversations()
      .subscribe((conversations: any) => {
        console.log(conversations);
        this.conversations.set(conversations?.data);
      });
  }
}
