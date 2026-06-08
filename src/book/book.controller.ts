import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { createBookSchema, type CreateBookDto } from './dto/create-book.dto';
import { ZodValidationPipe } from './zod-validation.pipe';
import { updateBookSchema, type UpdateBookDto } from './dto/update-book.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('book')
@UseInterceptors(TransformInterceptor)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createBookSchema))
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Patch('/:id')
  updateBook(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateBookSchema)) body: UpdateBookDto,
  ) {
    return this.bookService.update(body, id);
  }
}
