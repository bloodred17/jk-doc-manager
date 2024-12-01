import { Component } from '@angular/core';
import {
  LucideAngularModule,
  MessageSquarePlus,
  Plus,
  Trash,
} from 'lucide-angular';
import { DatePipe } from '@angular/common';

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
            <td>Date</td>
            <td class="flex justify-end">
              <button class="btn btn-xs btn-secondary">
                <lucide-icon
                  [img]="Plus"
                  class="h-4 w-4 stroke-white"
                ></lucide-icon>
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          @for (row of data; track row) {
          <tr>
            <td>{{ row.filename }}</td>
            <td>{{ row.uploadedOn | date : 'MMM, dd YYYY - HH:mm' }}</td>
            <td class="flex justify-end gap-1">
              <button class="btn btn-xs btn-primary">
                <lucide-icon
                  [img]="MessageSquarePlus"
                  class="h-4 w-4 stroke-white"
                ></lucide-icon>
              </button>
              <button class="btn btn-xs btn-error">
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
  imports: [LucideAngularModule, DatePipe],
})
export class UploadedFilesComponent {
  data = [
    {
      filename: 'file.txt',
      url: 'http://localhost:8080',
      uploadedOn: new Date().toISOString(),
    },
  ];
  protected readonly MessageSquarePlus = MessageSquarePlus;
  protected readonly Trash = Trash;
  protected readonly Plus = Plus;
}
