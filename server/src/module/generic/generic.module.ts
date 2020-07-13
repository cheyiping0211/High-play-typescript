import { Module } from '@nestjs/common';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';

@Module({
  controllers: [GenericController],
  providers: [GenericService],
})
export class GenericModule {}
