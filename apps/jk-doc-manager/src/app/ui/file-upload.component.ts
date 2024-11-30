import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  template: `
    <label class="form-control w-full max-w-xs">
      <!--      <div class="label">-->
      <!--        <span class="label-text">Pick a file</span>-->
      <!--        <span class="label-text-alt">Alt label</span>-->
      <!--      </div>-->
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
      />
      <!--      <div class="label">-->
      <!--        <span class="label-text-alt">Alt label</span>-->
      <!--        <span class="label-text-alt">Alt label</span>-->
      <!--      </div>-->
    </label>
  `,
})
export class FileUploadComponent {}
