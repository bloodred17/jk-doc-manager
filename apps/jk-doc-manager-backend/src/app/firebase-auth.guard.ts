import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp()?.getRequest();
    // const cookies = parse(request?.headers?.cookie || '');
    const sessionCookie = request?.headers?.['x-session-id'];
    if (!sessionCookie) {
      throw new UnauthorizedException('No session cookie found');
    }

    try {
      request.user = await getAuth().verifySessionCookie(sessionCookie, true);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid session');
    }
  }
}
