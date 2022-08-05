import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>,
  ) {}

  async executeSeed() {
    await this.deleteTables();
    const user = await this.insertUsers();
    await this.insertNewProducts(user);
    return `Seed executed!`;
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepositoy.create(user));
    });

    const dbUsers = await this.userRepositoy.save(seedUsers);

    return dbUsers[0];
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepositoy.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewProducts(user: User) {
    const seedProducts = initialData.products;
    const insertPromises = [];
    seedProducts.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });
    await Promise.all(insertPromises);
  }
}
