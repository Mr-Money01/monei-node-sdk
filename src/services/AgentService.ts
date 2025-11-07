import { MoneiClient } from '../client/MoneiClient';
import {
  ConversationListResponseDto,
  ConversationMessagesResponseDto,
  CreateConversationDto,
  PinConversationDto,
  AgentChatRequestDto,
  AgentChatResponseDto,
  AgentStreamRequestDto,
  GuestAgentRequestDto
} from '../types';

export class AgentService {
  constructor(private client: MoneiClient) {}

  async getConversations(): Promise<ConversationListResponseDto[]> {
    return this.client.get<ConversationListResponseDto[]>('/api/v1/agent/conversations');
  }

  async getConversationMessages(conversationId: string, limit?: number): Promise<ConversationMessagesResponseDto[]> {
    const params = limit ? { limit } : undefined;
    return this.client.get<ConversationMessagesResponseDto[]>(
      `/api/v1/agent/conversations/${conversationId}/messages`,
      { params }
    );
  }

  async initializeConversation(conversationData: CreateConversationDto): Promise<any> {
    return this.client.post('/api/v1/agent/conversations/init-conversation', conversationData);
  }

  async chat(chatData: AgentChatRequestDto): Promise<AgentChatResponseDto> {
    return this.client.post<AgentChatResponseDto>('/api/v1/agent/conversations', chatData);
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await this.client.delete(`/api/v1/agent/conversations/${conversationId}`);
  }

  async pinConversation(conversationId: string, pinData: PinConversationDto): Promise<void> {
    await this.client.patch(`/api/v1/agent/conversations/${conversationId}/pin`, pinData);
  }

  async streamChat(streamData: AgentStreamRequestDto): Promise<any> {
    return this.client.post('/api/v1/agent/conversations/stream', streamData, {
      headers: {
        'Accept': 'text/event-stream'
      }
    });
  }

  async streamGuestChat(guestData: GuestAgentRequestDto): Promise<any> {
    return this.client.post('/api/v1/guest-agent/stream', guestData, {
      headers: {
        'Accept': 'text/event-stream'
      }
    });
  }
}