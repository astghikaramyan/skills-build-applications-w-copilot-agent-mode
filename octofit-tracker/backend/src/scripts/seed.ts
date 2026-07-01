import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';
import { mongoUri } from '../config/database';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Chen',
      email: 'ava.chen@example.com',
      goals: ['Run a 10K', 'Improve mobility'],
    },
    {
      name: 'Marcus Lee',
      email: 'marcus.lee@example.com',
      goals: ['Build strength', 'Reduce stress'],
    },
    {
      name: 'Sofia Patel',
      email: 'sofia.patel@example.com',
      goals: ['Train for a triathlon', 'Stay consistent'],
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Velocity Squad',
      description: 'A high-energy team focused on endurance and consistency.',
      members: users.map((user) => user._id.toString()),
    },
    {
      name: 'Strength Collective',
      description: 'A group dedicated to progressive strength training.',
      members: [users[1]._id.toString(), users[2]._id.toString()],
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      duration: 35,
      distance: 7.2,
      date: new Date('2026-06-28T06:30:00Z'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      duration: 50,
      date: new Date('2026-06-29T18:00:00Z'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'cycle',
      duration: 45,
      distance: 18.4,
      date: new Date('2026-06-30T07:15:00Z'),
    },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { userId: users[0]._id.toString(), score: 920 },
    { userId: users[1]._id.toString(), score: 860 },
    { userId: users[2]._id.toString(), score: 890 },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility Flow',
      description: 'A guided mobility routine for posture and recovery.',
      duration: 20,
      difficulty: 'beginner',
      category: 'mobility',
      userId: users[0]._id.toString(),
    },
    {
      title: 'Power Circuit',
      description: 'Full-body strength circuit with kettlebells and bodyweight.',
      duration: 40,
      difficulty: 'intermediate',
      category: 'strength',
      userId: users[1]._id.toString(),
    },
    {
      title: 'Tempo Ride',
      description: 'A steady cycling workout focused on endurance.',
      duration: 35,
      difficulty: 'intermediate',
      category: 'cardio',
      userId: users[2]._id.toString(),
    },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard entries:', leaderboard.length);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
