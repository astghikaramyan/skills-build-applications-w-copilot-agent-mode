import express from 'express';
import routes from './routes';
import { connectToDatabase } from './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
