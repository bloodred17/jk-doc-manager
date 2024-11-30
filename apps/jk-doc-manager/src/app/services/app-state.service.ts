import { Injectable, signal } from '@angular/core';

export enum AppMode {
  Upload = 'upload',
  Chat = 'chat',
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  appState = signal<AppMode>(AppMode.Upload);
}
