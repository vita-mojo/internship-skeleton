import express from 'express';
import { Connection } from 'typeorm';

import { Menu } from './data/models/menu';
import { ModifierCategory } from './data/models/modifierCategory';
import { Modifiers } from './data/models/modifiers';
import { Product } from './data/models/product';
import { Store } from './data/models/store';
import storeRoutes from './routes/store';

export const connection = new Connection({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: [Store, Menu, Product, ModifierCategory, Modifiers]
}); //establish connection with database

const app = express();
const port = process.env.port || 3333;

app.use('/api', storeRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const start = async () => {
  try {
    await connection.connect();
    console.log('Successfully connected to the database');
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
    server.on('error', console.error);
  } catch (error) {
    console.log(error);
  }
};

start();
