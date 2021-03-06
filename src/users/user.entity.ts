import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserDetailsEntity } from '../users-details/user-details.entity';
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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserDetailsEntity, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetailsEntity;

  @ManyToMany(() => RoleEntity, (RoleEntity) => RoleEntity.users)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];
}
