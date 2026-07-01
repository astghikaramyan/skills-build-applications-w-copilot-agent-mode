import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = express.Router();

function getBaseUrl(req: express.Request) {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `${req.protocol}://${req.get('host')}`;
}

router.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

router.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

router.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).lean();
  res.json(leaderboard);
});

router.post('/api/leaderboard', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

router.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.get('/api/base-url', (req, res) => {
  res.json({ baseUrl: getBaseUrl(req) });
});

export default router;
