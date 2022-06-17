import express from 'express';
import { Connection } from 'typeorm';

import { Menu } from './data/models/menu';
import { ModifierCategory } from './data/models/modifierCategory';
import { Modifiers } from './data/models/modifiers';
import { Product } from './data/models/product';
import { Store } from './data/models/store';
import menuRouter from './routes/menu.route';
import productRouter from './routes/product.route';

const app = express();
const port = process.env.port || 3333;

export const connection = new Connection({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: [Store, Menu, Product, ModifierCategory, Modifiers]
});

connection
  .connect()
  .then(() => {
    console.log('database connecteded');
  })
  .catch((err) => console.log(err));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.use('/api', menuRouter);
app.use('/api', productRouter);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
