import { Component, inject, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  MessageSquarePlus,
  Plus,
  Trash,
} from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { ConversationService } from '../services/conversation.service';
import { Router, RouterLink } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  standalone: true,
  selector: 'app-uploaded-files',
  template: `
    <div class="overflow-x-auto">
      <table class="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <!--            <th>ConversationID</th>-->
            <td>Name</td>
            <td class="invisible md:visible">URL</td>
            <td class="flex justify-end">
              <a class="btn btn-xs btn-secondary" [routerLink]="['']">
                <lucide-icon
                  [img]="Plus"
                  class="h-4 w-4 stroke-white"
                ></lucide-icon>
              </a>
            </td>
          </tr>
        </thead>
        <tbody>
          @for (row of files; track row) {
          <tr>
            <td>{{ row.name }}</td>
            <td class="invisible md:visible">{{ row.url }}</td>
            <!--            <td>{{ row.uploadedOn | date : 'MMM, dd YYYY - HH:mm' }}</td>-->
            <td class="flex justify-end gap-1">
              <button
                class="btn btn-xs btn-primary"
                (click)="startNewConversation(row)"
              >
                <lucide-icon
                  [img]="MessageSquarePlus"
                  class="h-4 w-4 stroke-white"
                ></lucide-icon>
              </button>
              <button class="btn btn-xs btn-error" (click)="deleteFile(row)">
                <lucide-icon
                  [img]="Trash"
                  class="h-4 w-4 stroke-white"
                ></lucide-icon>
              </button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  imports: [LucideAngularModule, DatePipe, RouterLink],
})
export class UploadedFilesComponent implements OnInit {
  conversationService = inject(ConversationService);
  router = inject(Router);
  fileService = inject(FileService);
  files: any[] = [];

  protected readonly MessageSquarePlus = MessageSquarePlus;
  protected readonly Trash = Trash;
  protected readonly Plus = Plus;

  ngOnInit() {
    this.fileService.getAllFiles().subscribe((res: any) => {
      console.log(res);
      this.files = res?.data;
    });
  }

  startNewConversation(row: any) {
    this.conversationService
      .createNewConversation(row?.name)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/ask', res?.conversation?._id]);
      });
  }

  deleteFile(row: any) {
    this.fileService.deleteFile(row?.name).subscribe((res: any) => {
      console.log(res);
      this.files = this.files.filter((file) => file.name !== row.name);
    });
  }
}
