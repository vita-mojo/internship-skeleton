import cors from 'cors';
import express from 'express';
import { Connection } from 'typeorm';

import { Menu } from './data/models/menu';
import { ModifierCategory } from './data/models/modifierCategory';
import { Modifiers } from './data/models/modifiers';
import { Product } from './data/models/product';
import { Store } from './data/models/store';
<<<<<<< HEAD
import menuRouter from './routes/menu.route';
import productRouter from './routes/product.route';
import storeRoutes from './routes/store';

const app = express();
const port = process.env.port || 3333;

app.use(cors({ origin: 'http://localhost:4200' }));

export const connection = new Connection({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'vitaSQL',
  entities: [Store, Menu, Product, ModifierCategory, Modifiers]
}); //establish connection with database

app.use(cors(corsOptions));
app.use('/api', storeRoutes);
=======
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
>>>>>>> VMOS-6881

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

<<<<<<< HEAD
app.use('/api', menuRouter);
app.use('/api', productRouter);

=======
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
>>>>>>> VMOS-6881
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
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
