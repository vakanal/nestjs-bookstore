import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetailsEntity } from '../users-details/user-details.entity';
import { BookEntity } from '../books/book.entity';
import { RoleEntity } from '../roles/role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 250, nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, length: 250, nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true, length: 250, nullable: false })
  password: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserDetailsEntity, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetailsEntity;

  @ManyToMany(() => RoleEntity, (RoleEntity) => RoleEntity.users, {
    eager: true,
  })
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => BookEntity, (BookEntity) => BookEntity.authors)
  @JoinTable({ name: 'user_books' })
  books: BookEntity[];
}
