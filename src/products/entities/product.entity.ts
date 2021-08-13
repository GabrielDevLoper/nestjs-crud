import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  id_category: number;

  @Column()
  id_user: number;

  @Column()
  amount: number;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'id_category', referencedColumnName: 'id' })
  category: Category;
}
