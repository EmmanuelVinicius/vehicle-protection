import { Hapi } from '@hapi/hapi';

const init: any = async () => {
  const server: any = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/status',
    handler: (request, h) => {
      return `Server running on ${server.info.uri}`;
    }
  });

  await server.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
