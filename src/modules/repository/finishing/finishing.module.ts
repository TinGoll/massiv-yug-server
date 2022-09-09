import { Module } from '@nestjs/common';
import { ColorService } from './services/color/color.service';
import { ConverterService } from './services/converter/converter.service';
import { ColerService } from './services/coler/coler.service';
import { ColorResolver } from './resolvers/color/color.resolver';
import { ConverterResolver } from './resolvers/converter/converter.resolver';
import { ColerResolver } from './resolvers/coler/coler.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColerEntity } from './entities/coler.entity';
import { ColorEntity } from './entities/color.entity';
import { ConverterEntity } from './entities/converter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColorEntity, ConverterEntity, ColerEntity]),
  ],
  providers: [
    ColorService,
    ConverterService,
    ColerService,
    ColorResolver,
    ConverterResolver,
    ColerResolver,
  ],
})
export class FinishingModule {}
