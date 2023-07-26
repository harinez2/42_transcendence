import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostType } from './post.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostType> {
    return await this.postsService.findById(id);
  }

  @Post()
  create(@Body() post: PostType): void {
    this.postsService.create(post);
  }
}
