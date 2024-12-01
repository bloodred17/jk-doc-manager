import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from './firebase.service';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
