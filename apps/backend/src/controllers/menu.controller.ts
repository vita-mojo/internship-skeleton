import { Request, Response } from 'express';

import getMenus from '../services/menu.service';

const getMenu = async (req: Request, res: Response) => {
  try {
    const menus = await getMenus(req.params.id);
    return res.json({
      data: menus
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default { getMenu };
