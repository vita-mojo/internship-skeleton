import { Request, Response } from 'express';

import { getStores } from '../services/store';

export const getStoresAndMenus = async (req: Request, res: Response) => {
  try {
    const stores = await getStores(req.params.page);
    res.status(200).json(stores);
  } catch (error) {
    res.status(404).json({ message: 'Sorry, nothing found!' });
  }
};
