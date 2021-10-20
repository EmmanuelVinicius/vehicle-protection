import { start } from '../server';
let server;

const MOCK_VEHICLE_CREATE = {
  licensePlate: "abc123",
  model: "Test model",
};

const MOCK_ACCIDENT_CREATE = {
  description: "Test description",
  locale: "Test locale",
  timestamp: "2021-10-18T23:33:33.353Z",
};

let MOCK_USER_ID;
let MOCK_USERS_IDS = [];
let MOCK_VEHICLES_IDS = [];

describe('Accident test suit', () => {
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
    
    const user = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        firstName: "Mock",
        lastName: "User",
        age: 22,
        cpf: Math.floor(Math.random() * 100000000000),
        documents: [docPayload.id]
      }
    });
    
    const userPayload = JSON.parse(user.payload);
    MOCK_USER_ID = userPayload.id
    MOCK_USERS_IDS.push(MOCK_USER_ID)
  }, 30000);
  
  afterAll(async () => {
    await server.stop();
  });
  
  it('Creates a vehicle with the document for user', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/vehicle',
      payload: {
        ...MOCK_VEHICLE_CREATE,
        user: MOCK_USER_ID,
      }
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_VEHICLES_IDS.push(payload.id);
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Create an accident with vehicle and document and users', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/accident',
      payload: {
        ...MOCK_ACCIDENT_CREATE,
        users: MOCK_USERS_IDS,
        vehicles: MOCK_VEHICLES_IDS,
      }
    });
    
    expect(result.statusCode).toStrictEqual(200);
  });
})
