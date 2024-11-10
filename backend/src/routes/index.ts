import { Router } from 'express';
import { graveRouter } from '../api/grave';
import { reservationRouter } from '../api/reservation';

const router = Router();

router.use('/grave', graveRouter);
router.use('/reservation', reservationRouter);

export default router;
