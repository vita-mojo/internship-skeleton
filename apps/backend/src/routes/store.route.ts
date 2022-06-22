import express from 'express';

import { getStoresAndMenus } from '../controllers/store.controller';

const router = express.Router();

router.get('/stores/:page', getStoresAndMenus);

export default router;
