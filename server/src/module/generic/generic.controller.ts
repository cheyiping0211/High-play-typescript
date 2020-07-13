import { Controller, Get, Res, Req } from '@nestjs/common';
import { GenericService } from './generic.service';

@Controller()
export class GenericController {
  constructor(private readonly appService: GenericService) {}

  @Get('/api/getCity')
  async getConfig(@Res() res) {
    return await this.appService.getCityData(res);
  }
}
