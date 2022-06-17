/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { Connection } from 'typeorm';

import { Menu } from './data/models/menu';
import { ModifierCategory } from './data/models/modifierCategory';
import { Modifiers } from './data/models/modifiers';
import { Product } from './data/models/product';
import { Store } from './data/models/store';
import modifierCategoryRouter from './routes/modifierCategory';

export const myConnection = new Connection({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: [ModifierCategory, Product, Store, Modifiers, Menu]
});

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.use('/api', modifierCategoryRouter);

myConnection
  .connect()
  .then(() => {
    console.log('Connection has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Connection initialization', err);
  });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
