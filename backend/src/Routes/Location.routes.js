import { Router } from 'express';
import { getLocations, getLocation, createLocation, updateLocation, deleteLocation } from '../Controllers/Location.controller.js';
import { authenticateToken, authenticateAdmin } from '../middlewares/auth.Middleware.js';

const router = Router()

router.get('/location', authenticateToken, getLocations)

router.get('/location/:id', authenticateToken, getLocation)

router.post('/location', authenticateToken, authenticateAdmin, createLocation)

router.patch('/location/:id', authenticateToken, authenticateAdmin, updateLocation)

router.delete('/location/:id', authenticateToken, authenticateAdmin, deleteLocation)

export default router