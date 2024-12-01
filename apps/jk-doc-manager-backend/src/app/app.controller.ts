import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from './firebase.service';

@Controller()
export class AppController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get()
  getData() {
    return {
      message: this.firebaseService.getStorage(),
    };
  }
}
