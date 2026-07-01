"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const router = express_1.default.Router();
function getBaseUrl(req) {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:${process.env.PORT || 8000}`;
}
router.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
router.post('/api/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
router.post('/api/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
router.post('/api/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json(leaderboard);
});
router.post('/api/leaderboard', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
router.post('/api/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
router.get('/api/base-url', (req, res) => {
    res.json({ baseUrl: getBaseUrl(req) });
});
exports.default = router;
