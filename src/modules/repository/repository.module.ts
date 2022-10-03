import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorSampleEntity, ColorConverterEntity, ColorConverterColerEntity, DocumentColorEntity } from './finishing/document-color/entities/document-color.entity';
import { DocumentColorService } from './finishing/document-color/services/document-color/document-color.service';
import { DocumentPatinaEntity, PatinaConverterColerEntity, PatinaConverterEntity, PatinaSampleEntity } from './finishing/document-patina/entities/document-patina.entity';
import { VarnishSampleEntity, DocumentVarnishEntity } from './finishing/document-varnish/entities/document-varnish.entity';
import { MaterialSampleEntity } from './material/entities/document-material.entity';
import { PanelSampleEntity } from './panel/entities/document-panel.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      // entities
      ColorSampleEntity,
      ColorConverterEntity,
      ColorConverterColerEntity,
      DocumentColorEntity,
      PatinaSampleEntity,
      PatinaConverterEntity,
      PatinaConverterColerEntity,
      DocumentPatinaEntity,
      VarnishSampleEntity,
      DocumentVarnishEntity,
      MaterialSampleEntity,
      PanelSampleEntity,
    ]),
  ],
  providers: [DocumentColorService],
})
export class RepositoryModule {}
