import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CorreoProfessorsReq } from 'src/professors/interfaces/CorreoProfessorsReq';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email, horario) {

    //TODO: CAMBIEN ESTO PORQUE SI NO ME VOY A CHUTAR TODOS LOS HORARIOS
    //const email = "oscargutierrezgodoy@hotmail.com";

    //console.log(horario);

    //let memail="oscargutierrezgodoy@hotmail.com";

    await this.mailerService.sendMail({
      to: email,
      subject: 'horario',
      template: './templates/confirmation', 
      context: { 
        horario: horario
            //Aqui se ponen las variables que se enviarán al template7
          
      },
    });
  }

}