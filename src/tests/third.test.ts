import { start } from '../server';
let server;

const MOCK_USER_CREATE = {
  firstName: "Create",
  lastName: "User",
  age: 22,
  cpf: Math.floor(Math.random() * 100000000000)
};

const MOCK_NEW_DOCUMENT = {
  documentType: "ID",
  documentFile: "/files/id.txt"
};

const MOCK_NEW_THIRD = {
  firstName: "New",
  lastName: "User",
  age: 24,
  cpf: Math.floor(Math.random() * 100000000000)
};

const MOCK_NEW_ACCOUNT = {
  username: "third",
  password: "third123"
};

let MOCK_NEW_DOCUMENTS_IDS = [];
let MOCK_NEW_THIRD_ID;

describe('Third people test suite', () => {
  beforeAll(async () => {
    server = await start();
    
    const document = await server.inject({
      method: 'POST',
      url: '/document',
      payload: {
        documentType: "CPF",
        documentFile: "/files/cpf.txt"
      }
    });
    
    const docPayload = JSON.parse(document.payload);
    
    await server.inject({
      method: 'POST',
      url: '/user',
      payload: { ...MOCK_USER_CREATE, documents: [docPayload.id] }
    });
  }, 30000);
  
  afterAll(async () => {
    await server.stop();
  });
  
  it('Creates a new document for third', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/document',
      payload: MOCK_NEW_DOCUMENT
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_NEW_DOCUMENTS_IDS.push(payload.id);
    
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Try to create a user that already exists', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/user',
      payload: { ...MOCK_USER_CREATE, documents: MOCK_NEW_DOCUMENTS_IDS }
    });
    
    expect(result.statusCode).toStrictEqual(409);
  });
  
  it('Creates a new user without account', async() => {
    const result = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        ...MOCK_NEW_THIRD,
        documents: MOCK_NEW_DOCUMENTS_IDS
      }
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_NEW_THIRD_ID = payload.id;
    expect(result.statusCode).toStrictEqual(200);
  });
});

describe('Migrate third for new user', () => {
  it('Creates a new account for a third user', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/account',
      payload: { ...MOCK_NEW_ACCOUNT, user: MOCK_NEW_THIRD_ID }
    });
    
    expect(result.statusCode).toStrictEqual(200);
  });
});
