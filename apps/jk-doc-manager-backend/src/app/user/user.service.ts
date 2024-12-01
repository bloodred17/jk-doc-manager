import { Injectable } from '@nestjs/common';
import { CreateRequest, getAuth } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  async createUser(user: CreateRequest) {
    const createdUser = getAuth().createUser(user);
  }
}
