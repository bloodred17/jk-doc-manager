import { Injectable, signal } from '@angular/core';
import { FileClock, MessageSquareDiff, Upload } from 'lucide-angular';

export enum AppMode {
  Upload = 'upload',
  Chat = 'chat',
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  appMode = signal<AppMode>(AppMode.Upload);

  appMenu = [
    {
      label: 'History',
      route: '/history',
      icon: FileClock,
    },
    {
      label: 'New Chat',
      route: '/new',
      icon: MessageSquareDiff,
    },
    {
      label: 'Upload Document',
      route: '/',
      icon: Upload,
    },
  ];
}
