import { Router, Request, Response } from 'express';
import { inventoryRouter } from '../api/inventory';

const router = Router();

router.get('/inventory', inventoryRouter);

export default router;
