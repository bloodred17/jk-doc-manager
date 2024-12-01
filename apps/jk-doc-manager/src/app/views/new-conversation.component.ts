import { Component } from '@angular/core';
import { UploadedFilesComponent } from './uploaded-files.component';

@Component({
  standalone: true,
  selector: 'app-new-conversation',
  imports: [UploadedFilesComponent],
  template: `
    <div class="flex justify-center p-2 sm:p-4 md:p-12">
      <div class="card dark:bg-base-300 sm:w-[60vw] shadow p-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-inter">New Conversation</h1>
          <!--          <div-->
          <!--            class="flex gap-2 items-center bg-primary rounded p-2 mt-2 w-fit"-->
          <!--          >-->
          <!--            <span class="text-sm text-white">Select File</span>-->
          <!--            <input type="checkbox" class="toggle toggle-sm" checked="checked" />-->
          <!--            <span class="text-sm text-white">Upload New File</span>-->
          <!--          </div>-->
        </div>
        <div class="mt-4">
          <app-uploaded-files></app-uploaded-files>
        </div>
      </div>
    </div>
  `,
})
export class NewConversationComponent {}
