import { Request, Response } from 'express';

import { getStores } from '../services/store.service';

export const getStoresAndMenus = async (req: Request, res: Response) => {
  const { page } = req.params;
  const { deliveryType, storeName } = req.query;
  try {
    const storesAndMenus = await getStores(page, deliveryType, storeName);
    res.status(200).json(storesAndMenus);
  } catch (error) {
    res.status(404).json({ message: 'Sorry, nothing found!' });
  }
};
