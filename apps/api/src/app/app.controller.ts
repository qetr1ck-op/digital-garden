import { CatDto } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('cats')
  @ApiOkResponse({type: [CatDto]})
  getCats() {
    return this.appService.getCats();
  }
}
