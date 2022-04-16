import { Controller, Get, Logger, Res } from '@nestjs/common';
import { join } from 'path';
import { AppService } from './app.service';
const logger = new Logger();
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(@Res() res: any) {
    logger.log(res, 'an');

    return res.sendFile(join(__dirname, '../frontend/build', 'index.html'));
  }
}
