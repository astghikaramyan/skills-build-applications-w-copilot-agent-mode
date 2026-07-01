"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.mongooseConnection = exports.mongoUri = exports.databaseName = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.databaseName = 'octofit_db';
exports.mongoUri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${exports.databaseName}`;
exports.mongooseConnection = mongoose_1.default;
exports.mongoose = exports.mongooseConnection;
async function connectToDatabase() {
    if (exports.mongooseConnection.connection.readyState >= 1) {
        return exports.mongooseConnection.connection;
    }
    await exports.mongooseConnection.connect(exports.mongoUri);
    return exports.mongooseConnection.connection;
}
exports.default = exports.mongooseConnection;
