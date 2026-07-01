import express from 'express';
import routes from './routes';
import { connectToDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

async function start() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
      console.log(`Base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
