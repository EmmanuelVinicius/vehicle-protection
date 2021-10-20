import { server } from './../index';

describe('API suit test', () => {
    it('Check the server status', async () => {
        const v = server.events.on('start', () => {
            return true;
        })
        expect(server.info.port).toStrictEqual(3001)
    })
})