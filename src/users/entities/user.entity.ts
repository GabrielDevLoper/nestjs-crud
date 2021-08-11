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
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ select: false })
  id_profile: number;

  @Column()
  is_active: boolean;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn({ name: 'id_profile', referencedColumnName: 'id' })
  profile: Profile;

  @BeforeInsert()
  async passwordHash() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
