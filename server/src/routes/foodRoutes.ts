import {Router} from 'express';
import {getFoodsByMenuId} from '../controllers/foodController';

const router = Router();

router.get('/:id/foods', getFoodsByMenuId);

export default router;