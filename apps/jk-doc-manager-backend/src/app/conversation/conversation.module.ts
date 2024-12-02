import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';

@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [],
})
export class ConversationModule {}
