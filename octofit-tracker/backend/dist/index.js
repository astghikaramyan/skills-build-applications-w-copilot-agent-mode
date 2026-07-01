"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.use(routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
async function start() {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`API server listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
start();
