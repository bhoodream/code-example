import { createServer } from 'miragejs';

const createTestServer = () => {
    const server = createServer({});

    server.logging = false;
    server.timing = 0;

    afterAll(() => {
        server.shutdown();
    });

    return server;
};

export default createTestServer;
