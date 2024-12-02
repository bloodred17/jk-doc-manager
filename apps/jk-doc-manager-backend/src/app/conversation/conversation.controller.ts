import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Mongodb } from '../mongodb';
import { FirebaseAuthGuard } from '../firebase-auth.guard';
import { Conversation } from './conversation.schema';

@Controller('conversation')
export class ConversationController {
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createConversation(@Body() body: any) {
    try {
      const connection =
        Mongodb.getInstance<Mongodb>(Mongodb).getClient('test');
      if (!connection) {
        throw new Error('Connection not found');
      }

      const conversation = await Conversation.model({
        existingConnection: connection,
      }).create(new Conversation(body));

      return {
        success: true,
        conversation,
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async getConversations() {
    try {
      const connection =
        Mongodb.getInstance<Mongodb>(Mongodb).getClient('test');
      if (!connection) {
        throw new Error('Connection not found');
      }
      const result = await Conversation.model().find({});
      return {
        success: true,
        data: result,
        description: 'Conversations fetched successfully',
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  async getConversation(@Param('id') id: string) {
    try {
      const connection =
        Mongodb.getInstance<Mongodb>(Mongodb).getClient('test');
      if (!connection) {
        throw new Error('Connection not found');
      }
      const result = await Conversation.model().findOne({ _id: id });
      return {
        success: true,
        data: result,
        description: 'Conversations fetched successfully',
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  async deleteConversation(@Param('id') id: string) {
    try {
      const connection =
        Mongodb.getInstance<Mongodb>(Mongodb).getClient('test');
      if (!connection) {
        throw new Error('Connection not found');
      }

      const deleteConversation = await Conversation.model().deleteOne({
        _id: id,
      });
      return {
        success: true,
        data: deleteConversation,
        description: 'Conversation deleted successfully',
      };
    } catch (e) {
      return {
        success: false,
        error: e?.toString(),
      };
    }
  }
}
