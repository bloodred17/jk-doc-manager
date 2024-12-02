import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  template: `
    <label class="form-control w-full max-w-xs">
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
      />
    </label>
  `,
})
export class FileUploadComponent {}
