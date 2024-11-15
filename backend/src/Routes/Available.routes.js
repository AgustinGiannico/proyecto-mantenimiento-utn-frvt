import { Router } from 'express';
import { getAvailables, getAvailable, createAvailable, updateAvailable, deleteAvailable } from '../Controllers/Available.controller.js';
import { authenticateToken, authenticateAdmin } from '../middlewares/auth.Middleware.js';

const router = Router()

router.get('/available', authenticateToken, getAvailables)

router.get('/available/:id', authenticateToken, getAvailable)

router.post('/available', authenticateToken, authenticateAdmin, createAvailable)

router.patch('/available/:id', authenticateToken, authenticateAdmin, updateAvailable)

router.delete('/available/:id', authenticateToken, authenticateAdmin, deleteAvailable)

export default router