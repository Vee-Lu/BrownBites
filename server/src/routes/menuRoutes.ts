import {Router} from 'express';
import {getMenusByDiningLocationId} from '../controllers/menuController';

const router = Router();

router.get('/:id/menus', getMenusByDiningLocationId);

export default router;