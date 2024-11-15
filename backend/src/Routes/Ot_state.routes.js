import { Router } from 'express';

import { authenticateToken, authenticateAdmin } from '../middlewares/auth.Middleware.js';

const router = Router()

router.get('/ot-state', authenticateToken, )

router.get('/ot-state/:id', authenticateToken, )

router.post('/ot-state', authenticateToken, authenticateAdmin, )

router.patch('/ot-state/:id', authenticateToken, authenticateAdmin, )

router.delete('/ot-state/:id', authenticateToken, authenticateAdmin, )

export default router