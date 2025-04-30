import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { Delivery } from './deliveries/entities/delivery.entity';
import { PaymentsModule } from './payments/payments.module';

@Module({
 imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Paz.2025++', // <-- tu contraseña real
      database: 'test_paula',
      entities: [Product, Transaction, Customer, Delivery],
      synchronize: true, // crea la tabla automáticamente
    }),
    ProductsModule,
    TransactionsModule,
    CustomersModule,
    DeliveriesModule,
    PaymentsModule,
  ],
})
export class AppModule {}
