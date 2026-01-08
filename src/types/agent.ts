export interface ConversationListResponseDto {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  messageCount: number;
}

export interface ConversationMessagesResponseDto {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface CreateConversationDto {
  id: string;
}

export interface initializeConversationDto {
  statusCode: number;
  message: string;
  data: ConversationDto;
}

export interface ConversationDto {
  id: string;
  user?: {};
  messages?: {};
  title: string;
  context?: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedDate?: string;
}


export interface PinConversationDto {
  pin: boolean;
}

export interface AgentChatRequestDto {
  message: string;
  conversationId: string;
}

export interface AgentChatResponseDto {
  response: string;
  conversationId: string;
  title: string;
}

export interface AgentStreamRequestDto {
  message: string;
  conversationId: string;
  chainId?: number;
}

export interface ChatMessageDto {
  role: string;
  content: string;
}

export interface GuestAgentRequestDto {
  message: string;
  chatHistory?: ChatMessageDto[];
}