import { Injectable } from '@nestjs/common';
import { cert, initializeApp } from 'firebase-admin/app';
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

  async uploadToFirebase(
    file: File,
    name: string,
    email: string
  ): Promise<string> {
    try {
      const bucket = getStorage().bucket();
      const timestamp = Date.now();
      const fileName = `${email}/${timestamp}-${name}`;

      await bucket.file(fileName).save((file as any).buffer, {
        metadata: {
          contentType: 'application/pdf',
        },
      });

      const upload = bucket.file(fileName);
      await upload.makePublic();
      return upload.publicUrl();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Could not upload file: ${error.message}`);
    }
  }
}
