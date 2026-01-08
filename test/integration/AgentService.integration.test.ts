import { AgentService } from '../../src/services/AgentService';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { createTestClient, requireApiKey } from '../utils/test-setup';


import {
  CreateConversationDto,
  AgentChatRequestDto,
  PinConversationDto,
  ConversationListResponseDto,
  AgentChatResponseDto,
  AgentStreamRequestDto,
  GuestAgentRequestDto,
  initializeConversationDto,
  ConversationDto,
  ConversationMessagesResponseDto
} from '../../src/types';

describe('AgentService Integration Tests', () => {
  let agentService: AgentService;

  beforeAll(() => {
    if (!requireApiKey()) return;
    const client = createTestClient();
    agentService = new AgentService(client);
  });

  // -------------------------------------------------------------------------
  // GET CONVERSATIONS
  // -------------------------------------------------------------------------

  it('should fetch a list of conversations', async () => {
    if (!requireApiKey()) return;

    const result: ConversationListResponseDto[] = await agentService.getConversations();
    //console.log('Fetched Conversations:', result);

    expect(result).toBeDefined();
    // result is an array of ConversationListResponseDto, not an HTTP response object
    expect(Array.isArray(result)).toBe(true);

    if (result.length > 0) {
      result.forEach((convo: ConversationListResponseDto) => {
        expect(convo).toMatchObject({
          id: expect.any(String),
          //title: expect.any(String),
          isPinned: expect.any(Boolean),
          createdAt: expect.any(String),
          //messageCount: expect.any(Number),
        });
        // title can be string OR null
        expect(
          convo.title === null || typeof convo.title === 'string'
        ).toBe(true);
        //console.log('convo:', convo.id, convo.title, convo.isPinned, convo.createdAt, convo.messageCount);
      });
    }
  }, 30000);

  // -------------------------------------------------------------------------
  // GET CONVERSATIONS CHAT WITH A CONVERSATION ID
  // -------------------------------------------------------------------------

  it('should fetch conversation messages with conversationId', async () => {
    if (!requireApiKey()) return;

    const conversationData = {

      conversationId: 'OmMtjdjdK9XLKmtbc9cM6'

    };

    // Act
    const conversationRes: ConversationMessagesResponseDto[] = await agentService.getConversationMessages(conversationData.conversationId);
    //console.log('Fetched Conversation Messages:', conversationRes);

    // Assert
    expect(conversationRes).toBeDefined();
    expect(Array.isArray(conversationRes)).toBe(true);


    // Verify user data structure and data types
    if (conversationRes.length > 0) {
      conversationRes.forEach((msg: ConversationMessagesResponseDto) => {
        expect(msg).toMatchObject({
          id: expect.any(String),
          role: expect.any(String),
          content: expect.any(String),
          createdAt: expect.any(String),
        });
        //console.log('msg:', msg.id, msg.role, msg.content, msg.createdAt);
      })
    }


  }, 30000);




  // -------------------------------------------------------------------------
  // INITIALIZE CONVERSATION
  // -------------------------------------------------------------------------

 

  it('should initialize a chat (or return existing conversation)', async () => {
    if (!requireApiKey()) return;

    const conversationData: CreateConversationDto = {
      id: 'sdk-integration-test-010222'
    };

    let result: initializeConversationDto | undefined;
    let error: any;

    // initialize a new conversation and if conversation with same ID exists, return conversation already exists 
    try {
      result = await agentService.initializeConversation(conversationData);
    } catch (err) {
      error = err;
    }

    // ✅ CASE 1: Conversation created
    if (result) {

      // ✅ Only run these assertions if the call succeeded
      expect(result).toBeDefined();
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('message');


      expect(result.statusCode).toBe(200);
      const data: ConversationDto = result.data;
      console.log('Initialize Conversation Result:', data);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('updatedAt');
      expect(data).toHaveProperty('isPinned');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('deletedDate');
      expect(data).toHaveProperty('context');


      // TYPE CHECKS
      expect(typeof data.id).toBe('string');
      expect(typeof data.user).toBe('object');
      expect(
        data.title === null || typeof data.title === 'string'
      ).toBe(true);
      expect(
        data.context === null || typeof data.context === 'string'
      ).toBe(true);
      expect(typeof data.isPinned).toBe('boolean');
      expect(typeof data.createdAt).toBe('string');
      expect(typeof data.updatedAt).toBe('string');
      expect(
        data.deletedDate === null || typeof data.deletedDate === 'string'
      ).toBe(true);
      

      
      console.log('Conversation created:', result.data.id);
      return;
    }

    // ✅ CASE 2: Conversation already exists
    const msg =
      typeof error?.message === 'string'
        ? error.message
        : typeof error?.response?.data?.message === 'string'
          ? error.response.data.message
          : JSON.stringify(error);

    console.log('Conversation init error:', msg);
    expect(msg).toMatch(/already exists/i);
  }, 30000);

  // -------------------------------------------------------------------------
  // CHAT IN CONVERSATION
  // -------------------------------------------------------------------------

  it('should chat in an existing conversation', async () => {
    if (!requireApiKey()) return;
    const chatData: AgentChatRequestDto = {
      conversationId: 'sdk-integration-test-010222',
      message: 'Hello again, this is a follow-up test message!'
    };
    const chatRes: AgentChatResponseDto = await agentService.chat(chatData);

    expect(chatRes).toBeDefined();
    expect(chatRes).toHaveProperty('response');
    expect(typeof chatRes.response).toBe('string');
    expect(chatRes).toHaveProperty('conversationId');
    expect(chatRes.conversationId).toBe(chatData.conversationId);
    //expect(chatRes).toHaveProperty('title');
    //expect(typeof chatRes.title).toBe('string');
    //console.log('Chat Response:', chatRes);

  }, 30000);


  // -------------------------------------------------------------------------
  // DELETE CONVERSATION
  // -------------------------------------------------------------------------

  it('should delete a conversation', async () => {
    if (!requireApiKey()) return;

    const convo: initializeConversationDto = await agentService.initializeConversation({
      id: `sdk-test-${crypto.randomUUID()}`
    });

    //console.log('Initialized Conversation for Deletion Test:', convo.data.id, convo.data);

    const conversations: ConversationListResponseDto[] = await agentService.getConversations();

    if (conversations.length === 0) return;

    const convo2: ConversationDto = conversations[1];

    console.log('Deleting conversation:', convo2.id, convo2);


    await expect(
      agentService.deleteConversation(convo2.id)
    ).resolves.toBeUndefined();

    // Fetch the conversation again to verify deletion
    const convoId = convo2.id;
    await expect(agentService.getConversationMessages(convoId)).rejects.toThrow();
    //const convo2Messages: ConversationMessagesResponseDto[] = await agentService.getConversationMessages(convoId);
    //console.log('Fetched Conversation Messages after deletion:', convo2Messages);

    //expect(convo.data.isDeleted).toBe(false);


    // deleteConversation returns void; assert the call resolves without throwing
    //await expect(agentService.deleteConversation(convoId)).resolves.toBeUndefined();

  }, 30000);

  // -------------------------------------------------------------------------
  // PIN
  // -------------------------------------------------------------------------

  it('should pin and unpin a conversation', async () => {
    if (!requireApiKey()) return;

    const conversations: ConversationListResponseDto[] = await agentService.getConversations();

    if (conversations.length === 0) return;

    const convo: ConversationDto = conversations[0];

    //console.log('Testing pin/unpin on conversation:', convo.id, 'Current isPinned:', convo.isPinned, convo);

    const pinData: PinConversationDto = { pin: true };

    const pinResponse = await agentService.pinConversation(convo.id, pinData);

    // Update isPinned status to true for assertion

    const updatedConversations: ConversationListResponseDto[] = await agentService.getConversations();
    const updatedConvo = updatedConversations.find(c => c.id === convo.id);
    expect(updatedConvo).toBeDefined();
    //console.log('Updated Conversation after pinning:', updatedConvo);
    expect(updatedConvo?.isPinned).toBe(true);

    const unpinData: PinConversationDto = { pin: false };

    const unpinResponse = await agentService.pinConversation(convo.id, unpinData);

    // Update isPinned status to false for assertion
    const updatedConversations2: ConversationListResponseDto[] = await agentService.getConversations();
    const updatedConvo2 = updatedConversations2.find(c => c.id === convo.id);
    expect(updatedConvo2).toBeDefined();
    //console.log('Updated Conversation after unpinning:', updatedConvo2);
    expect(updatedConvo2?.isPinned).toBe(false);



  }, 30000);

  // -------------------------------------------------------------------------//
  // STREAM CHAT                                                              //
  // -------------------------------------------------------------------------//


  it('should stream chat responses (SSE)', async () => {
    if (!requireApiKey()) return;

    const conversationData: CreateConversationDto = {
      id: `stream-test-${crypto.randomUUID()}`
    };

    // 1️⃣ Initialize conversation
    const init = await agentService.initializeConversation(conversationData);

    const conversationId =
      init?.data?.conversationId ?? init?.conversationId;

    const streamReq: AgentStreamRequestDto = {
      conversationId,
      message: 'Hello stream testing',
    };

    // ✅ CALL the method
    const response = await agentService.streamChat(streamReq);

    //console.log('Stream Chat Response:', response);

    expect(response).toBeDefined();
    // NB: the response is an Axios response object containing the stream in a string format
    //expect(response).toHaveProperty('data');
    //expect(response).toHaveProperty('"events"');
    //expect(response.data).toHaveProperty('"events"');

  }, 30000);


  // -------------------------------------------------------------------------
  // STREAM GUEST CHAT
  // -------------------------------------------------------------------------

  it('should stream guest chat (SSE)', async () => {
    if (!requireApiKey()) return;

    const guestReq: GuestAgentRequestDto = {
      message: 'Hello guest stream'
    };

    // 1️⃣ Call the API
    const stream = await agentService.streamGuestChat(guestReq);

    //console.log('guest stream data:', stream);

    // 2️⃣ Assertion
    expect(stream).toBeDefined();

    //expect(stream).toHaveProperty('data');
    //expect(stream.data).toHaveProperty('events');
    //expect(stream.data).toHaveProperty('data');

  }, 30000);



});


