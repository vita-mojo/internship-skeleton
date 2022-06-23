import cors from 'cors';
import express from 'express';
import { Connection } from 'typeorm';

import { Menu } from './data/models/menu';
import { ModifierCategory } from './data/models/modifierCategory';
import { Modifiers } from './data/models/modifiers';
import { Product } from './data/models/product';
import { Store } from './data/models/store';
import menuRouter from './routes/menu.route';
import modifierCategoryRouter from './routes/modifierCategory.route';
import productRouter from './routes/product.route';
import storeRoutes from './routes/store.route';

const app = express();
const port = process.env.port || 3333;
const corsOptions = {
  origin: 'http://localhost:4200'
};

export const connection = new Connection({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: [Store, Menu, Product, ModifierCategory, Modifiers]
}); //establish connection with database

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', storeRoutes);
app.use('/api', menuRouter);
app.use('/api', productRouter);
app.use('/api', modifierCategoryRouter);

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
