import { Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async executeSeed(user: User) {
    await this.insertNewProducts(user);
    return `Seed executed!`;
  }

  private async insertNewProducts(user: User) {
    await this.productService.deleteAllProducts();
    const seedProducts = initialData.products;
    const insertPromises = [];
    seedProducts.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });
    await Promise.all(insertPromises);
  }
}
