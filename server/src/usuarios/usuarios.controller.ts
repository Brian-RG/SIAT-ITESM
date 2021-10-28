import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiBearerAuth('access-token')
  @Controller('usuarios')
  export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req: JwtRequest) {
      return this.usuariosService.findAll(req.user.id);
    }

    /*

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
      @Request() req: JwtRequest,
      @Param('id') id: string,
      @Body() updateProfessorDto: UpdateProfessorDto,
    ) {
      return this.professorsService.update(req.user.id, id, updateProfessorDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req: JwtRequest, @Param('id') id: string) {
      return this.professorsService.remove(req.user.id, id);
    }

    */
  }
  