import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarnishSampleEntity } from './finishing/document-varnish/entities/sample-varnish.entity';
import { MaterialSampleEntity } from './material/entities/sample-material.entity';
import { DocumentEntity } from './order/entities/document.entity';

import { PersonEntity } from './person/entities/person.entity';
import { VarnishService } from './finishing/document-varnish/services/document-varnish/document-varnish.service';
import { MaterialService } from './material/services/document-material/document-material.service';
import { PanelService } from './panel/services/document-panel/document-panel.service';
import { PersonService } from './person/services/person/person.service';
import { UserAccount } from './person/entities/user-account.entity';
import { ClientAccount } from './person/entities/client-account.entity';
import { ColorConverterColerEntity } from './finishing/document-color/entities/color-coler.entity';
import { ColorConverterEntity } from './finishing/document-color/entities/color-converter.entity';
import { DocumentColorEntity } from './finishing/document-color/entities/document-color.entity';
import { ColorSampleEntity } from './finishing/document-color/entities/sample-color.entity';
import { PatinaConverterColerEntity } from './finishing/document-patina/entities/coler-patina.entity';
import { PatinaConverterEntity } from './finishing/document-patina/entities/converter-patina.entity';
import { DocumentPatinaEntity } from './finishing/document-patina/entities/document-patina.entity';
import { PatinaSampleEntity } from './finishing/document-patina/entities/sample-patina.entity';
import { DocumentVarnishEntity } from './finishing/document-varnish/entities/document-varnish.entity';
import { DocumentMaterialEntity } from './material/entities/document-material.entity';
import { PanelSampleEntity } from './panel/entities/sample-panel.entity';
import { DocumentPanelEntity } from './panel/entities/document-panel.entity';
import { ProfileSampleEntity } from './profile/entities/sample-profile.entity';
import { DocumentProfileEntity } from './profile/entities/document-profile.entity';
import { BookStatusEntity } from './order/entities/book-statuses.entity';
import { BookEntity } from './order/entities/book.entity';
import { GeometryComponentEntity } from './component-data/geometry-component.entity';
import { NoteComponentEntity } from './component-data/note-component.entity';
import { ColorService } from './finishing/document-color/services/document-color/document-color.service';
import { PatinaService } from './finishing/document-patina/services/document-patina/document-patina.service';
import { ProfileService } from './profile/services/profile/profile.service';
import { ProfileImporter } from './profile/services/profile-importer';
import { SettingService } from './setting-data/services/setting/setting.service';
import { SettingEntity } from './setting-data/entities/setting.entity';
import { PersonPhone } from './person/entities/person-phone-entity';
import { PersonCard } from './person/entities/person-card-entity';
import { PersonEmail } from './person/entities/person-email-entity';
import { PersonBankAccount } from './person/entities/person-bank-account.entity';
import { PersonAddress } from './person/entities/person-address';
import { OrderService } from './order/services/order/order.service';
import { ElementEntity } from './order/entities/document-element.entity';
import { ElementSampleEntity } from './order/entities/sample-element.entity';
import { BookService } from './order/services/book/book.service';
import { DocumentService } from './order/services/document/document.service';
import { ElementService } from './order/services/element/element.service';
import { EcsModule } from '../ecs/ecs.module';
import { WorkSampleEntity } from './work/entities/work-sample.emtity';
import { SectorEntity } from './sector/entities/sector-entity';
import { SectorService } from './sector/services/sector/sector.service';
import { WorkService } from './work/services/work/work.service';

@Module({
  imports: [
    EcsModule, // Удалить этот модуль.
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
      DocumentMaterialEntity,
      PanelSampleEntity,
      DocumentPanelEntity,
      BookEntity,
      BookStatusEntity,
      PersonEntity,
      UserAccount,
      ClientAccount,
      ProfileSampleEntity,
      DocumentProfileEntity,
      DocumentEntity,
      ElementSampleEntity,
      ElementEntity,
      GeometryComponentEntity,
      NoteComponentEntity,
      SettingEntity,
      PersonPhone,
      PersonCard,
      PersonEmail,
      PersonBankAccount,
      PersonAddress,
      WorkSampleEntity,
      SectorEntity,
    ]),
  ],
  providers: [
    ColorService,
    PatinaService,
    VarnishService,
    MaterialService,
    PanelService,
    PersonService,
    ProfileService,
    ProfileImporter,
    SettingService,
    OrderService,
    ElementService,
    BookService,
    DocumentService,
    SectorService,
    WorkService,
  ],
  exports: [
    ColorService,
    PatinaService,
    VarnishService,
    MaterialService,
    PanelService,
    PersonService,
    ProfileService,
    SettingService,
    ProfileImporter,
    OrderService,
    ElementService,
    BookService,
    DocumentService,
    SectorService,
    WorkService,
  ],
})
export class RepositoryModule {}
