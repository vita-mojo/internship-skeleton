import { Request } from 'express';

import { ModifierCategory } from '../data/models/modifierCategory';
import { myConnection } from '../main';

const modifierCategoryService = async (req: Request) => {
  const modifierCategoty = await myConnection
    .getRepository(ModifierCategory)
    .createQueryBuilder('modifier-category')
    .leftJoinAndSelect('modifier-category.modifiers', 'modifier')
    .where('modifier-category.productId = :product_id', {
      product_id: req.params.product_id
    })
    .printSql()
    .getMany();
  return modifierCategoty;
};

export default modifierCategoryService;
