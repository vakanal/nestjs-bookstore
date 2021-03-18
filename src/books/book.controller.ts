import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookService } from './book.service';
import { ReadBookDto, CreateBookDto, UpdateBookDto } from './dtos';
import { Roles } from '../roles/decorators/role.decorator';
import { RoleType } from '../roles/roletype.enum';
import { RoleGuard } from '../roles/guards/role.guard';
import { GetUser } from '../users/decorators/user.decorator';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this.bookService.getAll();
  }

  @Get(':bookId')
  getBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReadBookDto> {
    return this.bookService.get(bookId);
  }

  @Get('author/:authorId')
  getBooksByAuhor(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<ReadBookDto[]> {
    return this.bookService.getBooksByAuthor(authorId);
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  create(@Body() book: CreateBookDto): Promise<ReadBookDto> {
    return this.bookService.create(book);
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createByAuthor(
    @Body() book: CreateBookDto,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this.bookService.createByAuthor(book, authorId);
  }

  @Patch(':bookId')
  update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() book: UpdateBookDto,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this.bookService.update(bookId, book, authorId);
  }

  @Delete()
  delete(@Param('bookId', ParseIntPipe) bookId: number): Promise<boolean> {
    return this.bookService.delete(bookId);
  }
}
