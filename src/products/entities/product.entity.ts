import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
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

  @Column()
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

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @BeforeInsert()
  codeToUpperCase() {
    this.code = this.code.toUpperCase();
  }
}
