const {userModel, todoModel} = require('../mongoose/models/call-2');

const callUtil = {
    async getDocuments(id, startDate) {
        let endDate = new Date();
        return await userModel.collection
        .find({
            createdAt: { $gte: startDate, $lt: endDate },
            myId: id,
        }).toArray();
    },
};

module.exports = callUtil;
