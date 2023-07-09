import { Injectable } from '@nestjs/common';
import { PostType } from './post.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PostType[]> {
    const posts = await this.prisma.post.findMany();
    return posts.map((post) => ({
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt.toISOString(),
    }));
  }

  async create(post: PostType): Promise<PostType> {
    const createdPost = await this.prisma.post.create({
      data: {
        id: parseInt(post.id),
        title: post.title,
        content: post.content,
        author: post.author,
        createdAt: new Date(post.createdAt),
      },
    });
  
    return {
      id: createdPost.id.toString(),
      title: createdPost.title,
      content: createdPost.content,
      author: createdPost.author,
      createdAt: createdPost.createdAt.toISOString(),
    };
  }

  async findById(id: string): Promise<PostType> {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (post) {
      return {
        id: post.id.toString(),
        title: post.title,
        content: post.content,
        author: post.author,
        createdAt: post.createdAt.toISOString(),
      };
    }
    return undefined;
  }
}
