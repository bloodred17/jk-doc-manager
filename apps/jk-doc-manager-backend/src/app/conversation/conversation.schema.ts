import { prop, mongoose, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { IModelOptions } from '@typegoose/typegoose/lib/types';

export class Conversation {
  _id?: ObjectId;

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  createdAt: Date = new Date();

  @prop()
  updatedAt: Date = new Date();

  constructor(init?: Partial<Conversation>) {
    if (init) {
      Object.assign(this, this, init);
    }
  }

  static model(options: IModelOptions | undefined = undefined) {
    return getModelForClass(Conversation, options);
  }
}
