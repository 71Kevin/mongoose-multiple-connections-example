const callUtil = require('../lib/call');
const find = require('lodash/find');
const conn = require('../mongoose/connection');
const logger = require('../lib/logger');

const call = {
    Teste: async () => {
        try {
            let myId = 1;
            let startDate = new Date(new Date()-10*60*1000);
            let call = await callUtil.getDocuments(myId, startDate);
            if (!call.length == '0') {
                let bulk = conn.todoConnection.collection('testes').initializeOrderedBulkOp();
                call.forEach((callFiltered) => {
                    bulk.insert({
                        "number": callFiltered.number,
                        "cpf": callFiltered.cpf,
                        "vars": callFiltered.vars
                    })
                });
                bulk.execute();
                logger.info(`quantity: ${call.length} | done!`);
            } else {
                logger.info(`quantity: ${call.length} | Nothing to do! ඞ`);
            }
        } catch (e) {
            logger.error(e.message);
        }
    }
}

module.exports = call;
