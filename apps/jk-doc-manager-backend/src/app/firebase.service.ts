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

  async uploadToFirebase(file: File, name: string): Promise<string> {
    try {
      const bucket = getStorage().bucket();
      const timestamp = Date.now();
      const fileName = `pdfs/${timestamp}-${name}`;

      // Upload the file
      await bucket.file(fileName).save((file as any).buffer, {
        metadata: {
          contentType: 'application/pdf',
        },
      });

      // Get signed URL (or make public and get public URL)
      const [url] = await bucket.file(fileName).getSignedUrl({
        action: 'read',
        expires: '03-01-2025', // Set an expiration date
      });

      return url;

      // Alternatively, if you want a public URL:
      // await bucket.file(fileName).makePublic();
      // return `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Could not upload file: ${error.message}`);
    }
  }
}
