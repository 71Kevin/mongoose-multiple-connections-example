const { todoModel } = require('../mongoose/models/call-2');
const logger = require('../lib/logger');

const callUtil = {
  async getDocuments(id, startDate) {
    try {
      const endDate = new Date();
      const calls = await todoModel.find({
        createdAt: { $gte: startDate, $lt: endDate },
        myId: id,
      });
      return calls;
    } catch (error) {
      logger.error(error.message);
      throw new Error('Failed to get documents from database');
    }
  },
};

const call = {
  Teste: async () => {
    try {
      const myId = 1;
      const startDate = new Date(new Date() - 10 * 60 * 1000);
      const calls = await callUtil.getDocuments(myId, startDate);
      if (calls.length > 0) {
        const bulkOps = calls.map((callFiltered) => ({
          insertOne: {
            document: {
              number: callFiltered.number,
              cpf: callFiltered.cpf,
              vars: callFiltered.vars,
            },
          },
        }));
        const result = await todoModel.bulkWrite(bulkOps);
        logger.info(`quantity: ${result.insertedCount} | done!`);
      } else {
        logger.info(`quantity: ${calls.length} | Nothing to do! ඞ`);
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error('Failed to perform test');
    }
  },
};

module.exports = call;
