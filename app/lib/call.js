const { userModel } = require('../mongoose/models/call-2');

const callUtil = {
  async getDocuments(id, startDate) {
    try {
      const endDate = new Date();
      const documents = await userModel.find({
        createdAt: { $gte: startDate, $lt: endDate },
        myId: id,
      });
      return documents;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve documents from database.');
    }
  },
};

module.exports = callUtil;
