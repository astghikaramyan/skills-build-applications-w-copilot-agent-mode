import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const mongoUri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${databaseName}`;
export const mongooseConnection = mongoose;

export async function connectToDatabase() {
  if (mongooseConnection.connection.readyState >= 1) {
    return mongooseConnection.connection;
  }

  await mongooseConnection.connect(mongoUri);
  return mongooseConnection.connection;
}

export { mongooseConnection as mongoose };
export default mongooseConnection;
