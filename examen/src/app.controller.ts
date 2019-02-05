import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }
}
export interface Usuario {
    id?: number;
    username: string;
    password:string;
    tipo:string;
    restaurant: string;
}