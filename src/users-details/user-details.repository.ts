import { Repository, EntityRepository } from 'typeorm';
import { UserDetailsEntity } from './user-details.entity';

@EntityRepository(UserDetailsEntity)
export class UserDetailsRepository extends Repository<UserDetailsEntity> {}
