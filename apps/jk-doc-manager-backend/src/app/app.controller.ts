import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  getData() {
    return {
      message: this.firebaseService.getStorage(),
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: File) {
    return {
      result: this.firebaseService.uploadToFirebase(file, 'abc.pdf')
    }
  }
}
