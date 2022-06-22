import { Router } from 'express';

import getModifierCategory from '../controllers/modifierCategory.controller';
const router = Router();

router.get('/modifierCategory/:product_id', getModifierCategory);

export default router;
