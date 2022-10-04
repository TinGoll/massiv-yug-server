import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorSampleEntity, ColorConverterEntity, ColorConverterColerEntity, DocumentColorEntity } from './finishing/document-color/entities/document-color.entity';
import { DocumentColorService } from './finishing/document-color/services/document-color/document-color.service';
import { DocumentPatinaEntity, PatinaConverterColerEntity, PatinaConverterEntity, PatinaSampleEntity } from './finishing/document-patina/entities/document-patina.entity';
import { VarnishSampleEntity, DocumentVarnishEntity } from './finishing/document-varnish/entities/document-varnish.entity';
import { MaterialSampleEntity } from './material/entities/document-material.entity';
import { BookEntity, BookStatusEntity } from './order/entities/book.entity';
import { DocumentEntity } from './order/entities/document.entity';
import { PanelSampleEntity } from './panel/entities/document-panel.entity';
import { PersonEntity, UserAccount, ClientAccount } from './person/entities/person.entity';
import { DocumentProfileEntity, ProfileSampleEntity } from './profile/entities/document-profile.entity';


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
      BookEntity,
      BookStatusEntity,
      PersonEntity,
      UserAccount,
      ClientAccount,
      ProfileSampleEntity,
      DocumentProfileEntity,
      DocumentEntity,
    ]),
  ],
  providers: [DocumentColorService],
})
export class RepositoryModule {}
