import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { AppRepository } from '@/repository/app.repository';
import { Film } from '@/entity/film';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [FilmsService, AppRepository],
  exports: [FilmsService],
})
export class FilmsModule {}
