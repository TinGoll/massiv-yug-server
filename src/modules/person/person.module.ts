import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PersonController } from './controllers/person.controller';
import { PersonAddress } from './entities/person.address.entity';
import { PersonBankAccount } from './entities/person.bank.account.entity';
import { PersonBarcodeEntity } from './entities/person.barcode.entity';
import { PersonCard } from './entities/person.card.entity';
import { ClientAccount } from './entities/person.client.account.entity';
import { PersonEmail } from './entities/person.email.entity';
import { PersonEntity } from './entities/person.entity';
import { PersonPhone } from './entities/person.phone.entity';
import { UserAccount } from './entities/person.user.account.entity';
import { FinancialAccount } from './entities/personal.account.entity';
import { PersonService } from './services/person.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientAccount,
      PersonCard,
      PersonBarcodeEntity,
      PersonBankAccount,
      PersonAddress,
      FinancialAccount,
      UserAccount,
      PersonPhone,
      PersonEntity,
      PersonEmail,
    ]),
    AuthModule,
  ],
  providers: [PersonService, UserService],
  exports: [PersonService, UserService],
  controllers: [PersonController, UserController, ClientController],
})
export class PersonModule {}
