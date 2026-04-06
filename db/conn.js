const mongoose = require("mongoose");

const DB = process.env.DATABASE;

const conn = async () => {
    try {
        await mongoose.connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        console.log("connection is successfully done");
    } catch (error) {
        console.log("Connection error: " + error.message);
    }
}

module.exports = conn;