import { Component, inject } from '@angular/core';
import { LucideAngularModule, CloudUpload } from 'lucide-angular';
import { FileUploadComponent } from '../ui/file-upload.component';
import { ChatComponent, ChatDirection } from '../ui/chat.component';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex flex-col justify-center items-center h-[91vh] gap-8">
      <!--      <lucide-icon [img]="Home" class="my-icon"></lucide-icon>-->
      <span class="font-inter text-2xl">Start by uploading a document</span>
      <label class="form-control w-full max-w-xs">
        <input
          type="file"
          class="file-input file-input-bordered w-full max-w-xs"
          (change)="onSingleFileSelect($event)"
        />
      </label>
      <button class="btn btn-primary" (click)="uploadSingleFile()">
        <lucide-icon [img]="CloudUpload"></lucide-icon>
        Upload
      </button>
      <div class="flex justify-center items-center">
        @if (uploadStatus?.type == 'uploading') {
        <progress
          class="progress progress-primary w-56"
          [value]="0"
          max="100"
        ></progress>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [LucideAngularModule, FileUploadComponent, ChatComponent],
})
export class HomeComponent {
  protected readonly CloudUpload = CloudUpload;
  router = inject(Router);
  authService = inject(AuthService);

  selectedFile: File | null = null;

  fileService = inject(FileService);
  uploadProgress = 0;
  uploadStatus: { type: string; message: string } | null = null;

  onSingleFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadSingleFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.uploadStatus = {
      type: 'uploading',
      message: 'File uploading',
    };
    const user = this.authService.user();
    this.fileService
      .uploadFile(formData, this.selectedFile.name, user?.uid)
      .subscribe({
        next: (event: any) => {
          console.log(event);
          if (event.type === 'progress') {
            this.uploadProgress = event.progress;
          } else if (event.type === 'complete') {
            this.uploadStatus = {
              type: 'success',
              message: 'File uploaded successfully!',
            };
            this.uploadProgress = 0;
            this.router.navigate(['/new']);
          }
        },
        error: (error) => {
          this.uploadStatus = {
            type: 'error',
            message: 'Error uploading file: ' + error.message,
          };
          this.uploadProgress = 0;
        },
      });
  }
}
