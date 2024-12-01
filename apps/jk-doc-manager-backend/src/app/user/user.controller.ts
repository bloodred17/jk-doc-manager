import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { UserService } from './user.service';
import { Mongodb } from '../mongodb';
import { User } from './user.schema';
import { FirebaseAuthGuard } from './firebase-auth.guard';

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    displayName?: string;
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: any) {
    try {
      const connection =
        Mongodb.getInstance<Mongodb>(Mongodb).getClient('test');
      if (!connection) {
        throw new Error('Connection not found');
      }
      const createdFirebaseUser = await getAuth().createUser(body);
      const user = new User({
        uid: createdFirebaseUser.uid,
        name: createdFirebaseUser.displayName,
        email: createdFirebaseUser.email,
      });
      const newUser = await User.model({
        existingConnection: connection,
      }).create(user);
      return {
        success: true,
        description: 'User created successfully',
        data: newUser._id,
      };
    } catch (e) {
      return {
        error: e?.toString(),
      };
    }
  }

  @Post('/login')
  async login(@Body() body: any, @Res() res: Response) {
    try {
      const { idToken, csrfToken } = body;
      console.log(idToken, csrfToken);

      await getAuth().verifyIdToken(idToken);
      const expiresIn = 60 * 60 * 1000;
      const sessionCookie = await getAuth().createSessionCookie(idToken, {
        expiresIn: expiresIn,
      });
      console.log({ sessionCookie });
      const result = await getAuth().verifySessionCookie(sessionCookie, true);
      console.log(result);
      // const token = await getAuth().createCustomToken(user.uid);
      res.cookie('session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      });
      res.send({
        success: true,
        description: 'User Logged in successfully',
        data: sessionCookie,
      });
    } catch (e) {
      console.log(e);
      return {
        error: e?.toString(),
      };
    }
  }

  @Post('check')
  @UseGuards(FirebaseAuthGuard)
  async getUsers(@Body() body: any) {
    try {
      console.log(body);

      return {
        success: true,
        data: '',
      };
    } catch (e) {
      return {
        error: e?.toString(),
      };
    }
  }
}
