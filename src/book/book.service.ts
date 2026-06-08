import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.model';
import { ConfigService } from '@nestjs/config';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private books: Book[] = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: 250000,
      publishedYear: 2008,
    },
    {
      id: '2',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      price: 300000,
      publishedYear: 1999,
    },
    {
      id: '3',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      price: 350000,
      publishedYear: 1994,
    },
    {
      id: '4',
      title: 'Refactoring',
      author: 'Martin Fowler',
      price: 280000,
      publishedYear: 2018,
    },
    {
      id: '5',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      price: 420000,
      publishedYear: 2003,
    },
  ];
  constructor(private configService: ConfigService) {
    const appPort = this.configService.get<number>('PORT');
    console.log(appPort);
  }

  findAll(): Book[] {
    return this.books;
  }

  findById(id: string): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách với id ${id}`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: Math.random().toString(36).substring(2, 9),
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(updateBookDto: UpdateBookDto, id: string) {
    const updateBook = this.books.find((b) => b.id === id);
    if (!updateBook) {
      throw new NotFoundException(`Không tìm thấy sách với id là ${id}`);
    }
    Object.assign(updateBook, updateBookDto);
    return updateBook;
  }

  delete(id: string): boolean {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy sách với id ${id}`);
    }

    this.books.splice(index, 1);

    return true;
  }
}
