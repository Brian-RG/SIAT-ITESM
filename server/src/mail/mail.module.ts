import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { dirname, join } from 'path';
import { JoinTable } from 'typeorm';
import { MailController } from './mail.controller';

let a = __dirname;
let b = dirname(__filename);
console.log(a);
console.log(b);
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'siat.correo@gmail.com',
          pass: 'pass123*',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        //dir: 'C:\\Users\\Oscar\\Desktop\\Proyecto semestre i\\SIAT-ITESM\\server\\src\\mail\\templates',
        dir: join(__dirname,'templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController], 
})
export class MailModule {}