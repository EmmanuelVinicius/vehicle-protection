import connection from "../connection";

describe('Test suite for the database', () => {
    it('Create a connection', async () => {
        const result = await connection.create();
        
        expect(result.isConnected).toBeTruthy()
        await connection.close();
    });
    it('Close a connection', async () => {
        const connect = await connection.create();
        await connection.close();
        
        expect(connect.isConnected).toBeFalsy();
    });
})