import { EntityRepository, Repository } from 'typeorm';

import { Product } from '../models/create-product-entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findAll() {
    return this.find({});
  }

  findByName(name: string) {
    return this.findOne({ name });
  }

  async destroy(name: string) {
    const product = await this.findOne({ name });
    await this.remove(product);
  }
}
