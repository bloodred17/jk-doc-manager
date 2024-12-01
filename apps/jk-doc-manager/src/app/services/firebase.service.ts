import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  readonly app: FirebaseApp;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    setPersistence(getAuth(), { type: 'NONE' });
  }
}
