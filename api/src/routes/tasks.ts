import { Router, Request, Response } from 'express';
import asanaService from '../services/asana';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await asanaService.getTask(req.params.id);
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const { projectId, name, notes, due_on } = req.body;
//     const task = await asanaService.createTask(projectId, { name, notes, due_on });
//     res.status(201).json(task);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { name, notes, completed, due_on } = req.body;
    const task = await asanaService.updateTask(req.params.id, { name, notes, completed, due_on });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;