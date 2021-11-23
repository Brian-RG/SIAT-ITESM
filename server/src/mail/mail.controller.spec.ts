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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../utils/interfaces/request-token';
import { ApiBearerAuth } from '@nestjs/swagger';
import {MailService } from '../mail/mail.service'
import { MailModule } from '../mail/mail.module';

@ApiBearerAuth('access-token')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: JwtRequest) {
      this.mailService.sendMail('oscargutierrezgodoy@hotmail.com', 'pana');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: JwtRequest) {
    //return this.professorsService.findAll(req.user.id);
    this.mailService.sendMail('oscargutierrezgodoy@hotmail.com', 'pana');
    console.log("Get");
  }

}
