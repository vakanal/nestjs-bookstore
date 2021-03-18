import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { In } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BookEntity } from './book.entity';
import { RoleEntity } from '../roles/role.entity';
import { UserEntity } from '../users/user.entity';
import { BookRepository } from './book.repository';
import { UserRepository } from '../users/user.repository';
import { EntityStatus } from '../shared/entity-status.enum';
import { RoleType } from '../roles/roletype.enum';
import { ReadBookDto, CreateBookDto, UpdateBookDto } from './dtos';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private userRepository: UserRepository,
  ) {}

  async get(bookId: number): Promise<ReadBookDto> {
    if (!bookId) {
      throw new BadRequestException('bookId must be sent');
    }

    const book: BookEntity = await this.bookRepository.findOne(bookId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!book) {
      throw new NotFoundException();
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: BookEntity[] = await this.bookRepository.find({
      where: { status: EntityStatus.ACTIVE },
    });

    return books.map((book: BookEntity) => plainToClass(ReadBookDto, book));
  }

  async getBooksByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) {
      throw new BadRequestException('authorId must be sent');
    }

    const books: BookEntity[] = await this.bookRepository.find({
      where: { status: EntityStatus.ACTIVE, authors: In([authorId]) },
    });

    return books.map((book: BookEntity) => plainToClass(ReadBookDto, book));
  }

  async create(book: CreateBookDto): Promise<ReadBookDto> {
    const authors: UserEntity[] = [];

    for (const authorId of book.authors) {
      const authorExist = await this.userRepository.findOne(authorId, {
        where: { status: EntityStatus.ACTIVE },
      });

      if (!authorExist) {
        throw new NotFoundException(
          `There's not an author with this Id: ${authorId}`,
        );
      }

      const isAuthor = authorExist.roles.some(
        (role: RoleEntity) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException(
          `This user ${authorId} is not an author`,
        );
      }

      authors.push(authorExist);
    }

    const savedBook: BookEntity = await this.bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async createByAuthor(
    book: CreateBookDto,
    authorId: number,
  ): Promise<ReadBookDto> {
    if (!authorId) {
      throw new BadRequestException('authorId must be sent');
    }

    const author: UserEntity = await this.userRepository.findOne(authorId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!author) {
      throw new NotFoundException(
        `There's not an author with this Id: ${authorId}`,
      );
    }

    const isAuthor = author.roles.some(
      (role: RoleEntity) => role.name === RoleType.AUTHOR,
    );

    if (!isAuthor) {
      throw new UnauthorizedException(`This user ${authorId} is not an author`);
    }

    const savedBook: BookEntity = await this.bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async update(
    bookId: number,
    book: UpdateBookDto,
    authorId: number,
  ): Promise<ReadBookDto> {
    if (!bookId || !authorId) {
      throw new BadRequestException('authorId and bookId must be sent');
    }

    const bookExist: BookEntity = await this.bookRepository.findOne(bookId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!bookExist) {
      throw new NotFoundException('This book does not exists');
    }

    const isOwnBook = bookExist.authors.some(
      (author: UserEntity) => author.id === authorId,
    );

    if (!isOwnBook) {
      throw new UnauthorizedException("This user is not book's author");
    }

    const updatedBook = await this.bookRepository.update(bookId, book);

    return plainToClass(ReadBookDto, updatedBook);
  }

  async delete(bookId: number): Promise<boolean> {
    if (!bookId) {
      throw new BadRequestException('bookId must be sent');
    }

    const bookExist: BookEntity = await this.bookRepository.findOne(bookId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!bookExist) {
      throw new NotFoundException('This book does not exists');
    }

    await this.bookRepository.update(bookId, { status: EntityStatus.INACTIVE });

    return true;
  }
}
