import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialController } from './controllers/financial.controller';
import { FinancialWriteOffs } from './entities/financial.order.write-offs.entity';
import { FinancialSalary } from './entities/financial.salary.entity';
import { FinancialTransaction } from './entities/financial.transaction.entity';
import { FinancialGateway } from './gateway/financial.gateway';
import { FinancialService } from './services/financial.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FinancialWriteOffs,
      FinancialTransaction,
      FinancialSalary,
    ]),
  ],
  controllers: [FinancialController],
  providers: [FinancialGateway, FinancialService],
})
export class FinancialModule {}
