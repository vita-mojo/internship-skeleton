import { Request, Response } from 'express';

import { getAllStores } from '../services/store';

export const getStores = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const stores = await getAllStores(req.params.id);
    res.status(200).json(stores);
  } catch (error) {
    res.status(404).json({ message: 'Sorry, nothing found!' });
  }
};
