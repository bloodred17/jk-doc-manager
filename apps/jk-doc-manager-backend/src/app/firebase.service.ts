import { Injectable } from '@nestjs/common';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    const serviceAccount = this.configService.get('credentials');
    initializeApp({
      credential: cert({
        projectId: serviceAccount?.project_id,
        clientEmail: serviceAccount?.client_email,
        privateKey: serviceAccount?.private_key,
      }),
      storageBucket: this.configService.get('STORAGE_BUCKET'),
    });
  }

  getStorage() {
    return getStorage().bucket().name;
  }
}
