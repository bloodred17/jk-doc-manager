import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

@Controller()
export class AppController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  check() {
    return {
      message: 'API is working.',
    };
  }

  @Post('upload')
  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: File,
    @Query('name') name: string,
    @Query('uid') uid: string
  ) {
    try {
      const user = await getAuth().getUser(uid);
      if (!name) {
        throw new Error('Name is required');
      }
      return {
        success: true,
        data: await this.firebaseService.uploadToFirebase(
          file,
          name,
          user.email
        ),
        description: 'File uploaded successfully',
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }

  @Get('files')
  @UseGuards(FirebaseAuthGuard)
  async getFile() {
    try {
      const bucket = getStorage().bucket();
      const files = await bucket.getFiles();
      return {
        success: true,
        data: files[0].map((file) => ({
          name: file.name,
          url: file.publicUrl(),
        })),
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }

  @Delete('file/:name')
  @UseGuards(FirebaseAuthGuard)
  async deleteFile(@Param('name') filename: string) {
    try {
      const fileName = decodeURIComponent(filename);
      const file = getStorage().bucket().file(fileName);
      const result = await file.delete();
      return {
        success: true,
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }
}
