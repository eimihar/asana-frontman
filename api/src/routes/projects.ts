import { Router, Request, Response } from 'express';
import asanaService from '../services/asana';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await asanaService.getProjects(req.query.workspace as string);
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await asanaService.getProject(req.params.id);
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await asanaService.getProjectTasks(req.params.id);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;