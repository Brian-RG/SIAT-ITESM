import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { DirectorEntity } from './entity/director.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [
        EventsModule,
        TypeOrmModule.forFeature([DirectorEntity, UsersEntity]),
    ],
    controllers: [DirectorController],
    providers: [DirectorService, JwtStrategy],
    exports: [DirectorService],
})
export class DirectorModule {}
