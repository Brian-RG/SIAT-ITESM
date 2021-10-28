import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { DirectorService } from './director.service';
  import { CreateDirectorReq } from './interfaces/createDirectorReq';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { JwtRequest } from '../utils/interfaces/request-token';
  import { UpdateDirectorDto } from './dto/update-director.dto';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { AvailableReq } from './interfaces/availableReq.interface';
  import { createResponseStatus } from 'src/utils/db/crud-entity';
  
  @ApiBearerAuth('access-token')
  @Controller('director')
  export class DirectorController {
    constructor(private readonly professorsService: DirectorService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req: JwtRequest, @Body() createReq: CreateDirectorReq) {
      //return this.professorsService.create(createReq, req.user.id);

      //Return Post request succesful

      return createResponseStatus(
        200,
        'Post succesful'
      );

    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req: JwtRequest) {
      //return this.professorsService.findAll(req.user.id);

      //Return Get request succesful

      return createResponseStatus(
        200,
        'Get succesful'
      );
    }

    @UseGuards(JwtAuthGuard)
    @Post('remaining')
    findAvailable(@Request() req: JwtRequest, @Body() info: AvailableReq) {
      //return this.professorsService.findAvailable(req.user.id, info);

      //Return post request succesful

      return createResponseStatus(
        200,
        'Post succesful'
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
      @Request() req: JwtRequest,
      @Param('id') id: string,
      @Body() updateProfessorDto: UpdateDirectorDto,
    ) {
      //return this.professorsService.update(req.user.id, id, updateProfessorDto);

      //Return put request succesful

      return createResponseStatus(
        200,
        'Put succesful'
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req: JwtRequest, @Param('id') id: string) {
      //return this.professorsService.remove(req.user.id, id);

      //Return delete request succesful

      return createResponseStatus(
        200,
        'Delete succesful'
      );
    }
  }
  