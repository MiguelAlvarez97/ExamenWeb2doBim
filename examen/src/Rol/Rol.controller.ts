import {Controller, Get, Res, Session} from "@nestjs/common";
import {RolService} from "./rol.service";

@Controller('rol')
export class RolController {
    constructor(
        private readonly _rolService:RolService,
    ) {}
    @Get('listar')
    async getRoles(
    ) {
        return await this._rolService.buscar();
    }
}