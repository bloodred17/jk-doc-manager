import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
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
      const createdFirebaseUser = await getAuth().createUser({
        email: body.email,
        emailVerified: true,
        password: body.password,
        displayName: body.displayName,
      });
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
      res.send({
        success: false,
        error: e?.toString(),
      });
    }
  }

  @Get('logout')
  @UseGuards(FirebaseAuthGuard)
  async logout(@Req() req: Request) {
    try {
      const auth = getAuth();
      const sessionCookie = req?.headers?.['x-session-id'] as string;
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);
      await auth.revokeRefreshTokens(decodedClaims.sub);

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully logged out',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to logout',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('check')
  @UseGuards(FirebaseAuthGuard)
  async getUsers() {
    try {
      return {
        success: true,
        data: true,
        description: 'Valid Session',
      };
    } catch (e) {
      return {
        error: e?.toString(),
      };
    }
  }
}
