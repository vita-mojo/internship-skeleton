import { Request, Response } from 'express';

import getMenus from '../services/menu.service';

const getMenu = async (req: Request, res: Response) => {
  const { id, page } = req.params;
  try {
    const menus = await getMenus(id, page);
    return res.json({
      data: menus
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default { getMenu };
