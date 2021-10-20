import { start } from '../server';
let server;

const MOCK_DOCUMENT_CREATE = {
  documentType: "CPF",
  documentFile: "/files/cpf.txt"
};

const MOCK_USER_CREATE = {
  firstName: "Create",
  lastName: "User",
  age: 22,
  cpf: Math.floor(Math.random() * 100000000000)
};

const MOCK_USER_UPDATE = {
  firstName: "Change",
  lastName: "User",
  age: 23
};

const MOCK_ACCOUNT_CREATE = {
  username: "test",
  password: "123test"
};

const MOCK_ACCOUNT_UPDATE = {
  password: "test123"
};

let MOCK_DOCUMENTS_IDS = [];
let MOCK_USER_ID;
let MOCK_ACCOUNT_ID;

describe('Client test suit.', () => {
  beforeAll(async () => {
    server = await start();
  }, 30000);
  afterAll(async () => {
    await server.stop();
  });
  
  it('Creates a document for the user client', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/document',
      payload: MOCK_DOCUMENT_CREATE
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_DOCUMENTS_IDS.push(payload.id);
    
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Creates a user client with the document', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/user',
      payload: { ...MOCK_USER_CREATE, documents: MOCK_DOCUMENTS_IDS }
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_USER_ID = payload.id;
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Creates an account of the user client', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/account',
      payload: { ...MOCK_ACCOUNT_CREATE, user: MOCK_USER_ID }
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_ACCOUNT_ID = payload.id;
    
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Updates the user client', async () => {
    const result = await server.inject({
      method: 'PATCH',
      url: `/user/${MOCK_USER_ID}`,
      payload: MOCK_USER_UPDATE
    })
    
    expect(result.statusCode).toStrictEqual(200);
    expect(result.result.affected).toBe(1);
  });
  
  it('Updates the account of the user client', async () => {
    const result = await server.inject({
      method: 'PATCH',
      url: `/account/${MOCK_ACCOUNT_ID}`,
      payload: MOCK_ACCOUNT_UPDATE
    });
    
    expect(result.statusCode).toStrictEqual(200);
    expect(result.result.affected).toBe(1);
  });
});