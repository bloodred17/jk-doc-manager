import { Component } from '@angular/core';
import { LucideAngularModule, CloudUpload } from 'lucide-angular';
import { FileUploadComponent } from '../ui/file-upload.component';
import { ChatComponent, ChatDirection } from '../ui/chat.component';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex flex-col justify-center items-center h-[91vh] gap-8">
      <!--      <lucide-icon [img]="Home" class="my-icon"></lucide-icon>-->
      <span class="font-inter text-2xl">Start by uploading a document</span>
      <app-file-upload></app-file-upload>
      <button class="btn btn-primary">
        <lucide-icon [img]="CloudUpload"></lucide-icon>
        Upload
      </button>
    </div>
  `,
  standalone: true,
  imports: [LucideAngularModule, FileUploadComponent, ChatComponent],
})
export class HomeComponent {
  protected readonly CloudUpload = CloudUpload;
  protected readonly ChatDirection = ChatDirection;
}
