import { MoneiClient } from '../../src/client/MoneiClient';

export const createMockMoneiClient = () => {
  const mockClient = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    setApiKey: jest.fn(),
    setBearerToken: jest.fn(),
    removeBearerToken: jest.fn(),
  };

  return mockClient as unknown as jest.Mocked<MoneiClient>;
};