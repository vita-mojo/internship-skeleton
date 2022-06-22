import { Request, Response } from 'express';

import modifierCategoryService from '../services/modifierCategory.service';

async function getModifierCategory(req: Request, res: Response) {
  try {
    const gotModifierCategory = await modifierCategoryService(req);
    return res.send(gotModifierCategory);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default getModifierCategory;
