import { Controller, Get, Res, Query, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { GetRandomParams } from './params/GetRandomParams';
import { PostRandomParams } from './params/PostRandomParams';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getRandom(@Query() params: GetRandomParams, @Res() res: Response) {
    const result = await this.appService.getRandomResponse(params);
    res.status(result.status).send(result);
  }

  @Post()
  async postRandom(@Body() body: PostRandomParams, @Res() res: Response) {
    const result = await this.appService.getRandomResponse(body);
    res.status(result.status).send(result);
  }
}
