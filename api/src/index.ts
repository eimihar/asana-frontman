import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';
import boardsRouter from './routes/boards';
import sectionsRouter from './routes/sections';
import tasksRouter from './routes/tasks';
import projectsRouter from './routes/projects';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/boards', boardsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/tasks', tasksRouter);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;