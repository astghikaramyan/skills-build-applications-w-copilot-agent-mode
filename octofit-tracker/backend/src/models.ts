import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  goals: string[];
  createdAt: Date;
}

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  date: Date;
  createdAt: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  updatedAt: Date;
}

export interface IWorkout extends Document {
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
  userId: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  goals: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: Number,
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  duration: { type: Number, required: true },
  difficulty: { type: String, default: 'beginner' },
  category: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
