import mongoose from 'mongoose';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export const database = mongoose;

export async function connectToDatabase() {
  if (database.connection.readyState >= 1) {
    return database.connection;
  }

  await database.connect(mongoUri);
  return database.connection;
}
