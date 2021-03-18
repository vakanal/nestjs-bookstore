import { OmitType } from '@nestjs/mapped-types';
import { CreateBookDto } from '.';

export class UpdateBookDto extends OmitType(CreateBookDto, [
  'authors',
] as const) {}
