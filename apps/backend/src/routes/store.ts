import express from 'express';

import { getStores } from '../controllers/store';

const router = express.Router();

router.get('/stores/:id', getStores);

export default router;
