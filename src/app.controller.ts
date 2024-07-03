import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    this.sayHello();
    return this.appService.getHello();
  }

  @Post()
  sayHello(): string {
    return this.appService.getHello();
  }
}
