import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from './firebase.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {Express} from "express";

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
    console.log(file);
  }
}
