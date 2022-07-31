import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  // eslint-disable-next-line prettier/prettier
  @ManyToOne(
    () => Product,
    (product) => product.images,
    // eslint-disable-next-line prettier/prettier
    { onDelete: 'CASCADE' },
  )
  product: Product;
}
