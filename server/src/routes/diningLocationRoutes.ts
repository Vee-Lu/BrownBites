import {Router} from 'express';
import {getDiningLocations, getDiningLocationById } from '../controllers/diningLocationController';

const router = Router();

router.get('/', getDiningLocations)
router.get('/:id', getDiningLocationById);

export default router;
