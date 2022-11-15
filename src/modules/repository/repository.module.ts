import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialService } from './material/material.service';
import { ProfileService } from './profile/profile.service';
import { SectorService } from './sector/sector.service';
import { WorkService } from './work/work.service';
import { ColorService } from './color/color.service';
import { PatinaService } from './patina/patina.service';
import { VarnishService } from './varnish/varnish.service';
import { PanelService } from './panel/panel.service';
import { PersonService } from './person/person.service';
import { SettingService } from './setting/setting.service';
import { OrderService } from './order/order.service';
import { ColorConverterEntity } from './color/entities/color.converter.entity';
import { ColorConverterColerEntity } from './color/entities/converter.coler.entity';
import { SampleColorEntity } from './color/entities/sample.color.entity';
import { SampleMaterialEntity } from './material/entities/sample.material.entity';
import { BookEntity } from './order/entities/book.entity';
import { BookStatusEntity } from './order/entities/book.status.entity';
import { DocumentColorEntity } from './order/entities/document.color.entity';
import { ElementEntity } from './order/entities/document.element.entity';
import { DocumentEntity } from './order/entities/document.entity';
import { DocumentPanelEntity } from './order/entities/document.panel.entity';
import { DocumentPatinaEntity } from './order/entities/document.patina.entity';
import { DocumentProfileEntity } from './order/entities/document.profile.entity';
import { DocumentVarnishEntity } from './order/entities/document.varnish.entity';
import { SampleElementEntity } from './order/entities/element.entity';
import { SamplePanelEntity } from './panel/entities/sample.panel.entity';
import { PatinaConverterColerEntity } from './patina/entities/patina.converter.coler';
import { PatinaConverterEntity } from './patina/entities/patina.converters.entity';
import { SamplePatinaEntity } from './patina/entities/sample.patina.entity';
import { PersonAddress } from './person/entities/person.address.entity';
import { PersonBankAccount } from './person/entities/person.bank.account.entity';
import { PersonCard } from './person/entities/person.card.entity';
import { ClientAccount } from './person/entities/person.client.account.entity';
import { PersonEmail } from './person/entities/person.email.entity';
import { PersonEntity } from './person/entities/person.entity';
import { PersonPhone } from './person/entities/person.phone.entity';
import { UserAccount } from './person/entities/person.user.account.entity';
import { SampleProfileEntity } from './profile/entities/sample.profile.entity';
import { SectorEntity } from './sector/entities/sector.entity';
import { SettingEntity } from './setting/entities/setting.entity';
import { SampleVarnishEntity } from './varnish/entities/sample.varnish.entity';
import { SampleWorkEntity } from './work/entities/sample.work.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColorConverterEntity,
      ColorConverterColerEntity,
      SampleColorEntity,
      SampleMaterialEntity,
      BookEntity,
      BookStatusEntity,
      DocumentColorEntity,
      ElementEntity,
      DocumentEntity,
      DocumentPanelEntity,
      DocumentPatinaEntity,
      DocumentProfileEntity,
      DocumentVarnishEntity,
      SampleElementEntity,
      SamplePanelEntity,
      PatinaConverterColerEntity,
      PatinaConverterEntity,
      SamplePatinaEntity,
      PersonAddress,
      PersonBankAccount,
      PersonCard,
      ClientAccount,
      PersonEmail,
      PersonEntity,
      PersonPhone,
      UserAccount,
      SampleProfileEntity,
      SectorEntity,
      SettingEntity,
      SampleVarnishEntity,
      SampleWorkEntity,
    ]),
  ],
  providers: [
    MaterialService,
    ProfileService,
    SectorService,
    WorkService,
    ColorService,
    PatinaService,
    VarnishService,
    PanelService,
    PersonService,
    SettingService,
    OrderService,
  ],
})
export class RepositoryModule {}
