import { Router, Request, Response } from 'express';
import asanaService from '../services/asana';

const router = Router();

router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const sections = await asanaService.getSections(req.params.projectId);
    res.json(sections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await asanaService.getSectionTasks(req.params.id);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;