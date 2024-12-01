import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { IModelOptions } from '@typegoose/typegoose/lib/types';

@index({ email: 1 }, { unique: true })
export class User {
  @prop()
  uid: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  roles: string[] = ['default'];

  @prop()
  createdAt: Date = new Date();

  @prop()
  updatedAt: Date;

  @prop()
  deletedAt: Date;

  constructor(init?: Partial<User>) {
    if (init) {
      Object.assign(this, this, init);
    }
  }

  static model(options: IModelOptions | undefined = undefined) {
    return getModelForClass(User, options);
  }
}
