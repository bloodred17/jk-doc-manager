import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private domain = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getEventData(event: HttpEvent<any>): any {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = Math.round((100 * event.loaded) / (event.total || 1));
        return { type: 'progress', progress };
      case HttpEventType.Response:
        return { type: 'complete', body: event.body };
      default:
        return { type: 'other', event };
    }
  }

  uploadFile(formData: FormData, name: string, uid: string): Observable<any> {
    if (!name) {
      throw new Error('Can not upload without a valid name');
    }
    if (!uid) {
      throw new Error('Can not upload without a valid uid');
    }
    return this.http
      .post(`${this.domain}/api/upload`, formData, {
        reportProgress: true,
        observe: 'events',
        params: { name, uid },
      })
      .pipe(map((event) => this.getEventData(event)));
  }

  getAllFiles() {
    return this.http.get(`${this.domain}/api/files`);
  }

  deleteFile(fileName: string) {
    return this.http.delete(
      `${this.domain}/api/file/${encodeURIComponent(fileName)}`
    );
  }
}
