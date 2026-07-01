"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';
exports.database = mongoose_1.default;
async function connectToDatabase() {
    if (exports.database.connection.readyState >= 1) {
        return exports.database.connection;
    }
    await exports.database.connect(mongoUri);
    return exports.database.connection;
}
