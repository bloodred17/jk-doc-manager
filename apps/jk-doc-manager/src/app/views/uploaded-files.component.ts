import { Component } from '@angular/core';

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
          </tr>
        </thead>
        <tbody>
          @for (row of data; track row) {
          <tr>
            <td>{{ row.filename }}</td>
            <td>{{ row.uploadedOn }}</td>
          </tr>
          }
        </tbody>
        <tfoot>
          <tr>
            <!--            <th></th>-->
            <td>Name</td>
            <td>Date</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
})
export class UploadedFilesComponent {
  data = [
    {
      filename: 'file.txt',
      url: 'http://localhost:8080',
      uploadedOn: new Date().toISOString(),
    },
  ];
}
