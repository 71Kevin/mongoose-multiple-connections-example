const mongoose = require('mongoose');

function makeNewConnection(uri) {
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });
    
    db.on('connected', function () {
        console.log(`MongoDB :: connected ${this.name}`);
    });
    
    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });
    
    return db;
}

const userConnection = makeNewConnection(`mongodb://127.0.0.1:27017/myDB1`);
const todoConnection = makeNewConnection(`mongodb://127.0.0.1:27017/myDB2`);

module.exports = {
    userConnection,
    todoConnection,
};
