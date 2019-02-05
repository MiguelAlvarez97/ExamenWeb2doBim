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
    nombre:string;
    apellido:string;
    email: string;
    password:string;
    fechaNacimiento:string;
    //tipo:string;
    //restaurant: string;
}