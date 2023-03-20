const Server = require('./server/server');
const { userConnection, todoConnection } = require('./mongoose/connection');
const call = require('./controller/call');
const cron = require('node-cron');

const main = async () => {
  try {
    await Server.bootstrap();
    await userConnection;
    await todoConnection;
    cron.schedule(
      '*/10 * * * *',
      async () => {
        await call.Teste();
      },
      { timezone: process.env.TIME_ZONE }
    );
  } catch (error) {
    console.error(error);
  }
};

main();
