import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepo: Repository<Delivery>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

	async create(data: CreateDeliveryDto): Promise<Delivery> {
	  const customer = await this.customerRepo.findOneBy({ id: data.customerId });
	  const product = await this.productRepo.findOneBy({ id: data.productId });
	  const transaction = await this.transactionRepo.findOneBy({ id: data.transactionId });

	  if (!customer || !product || !transaction) {
		throw new Error('Entidad relacionada no encontrada');
	  }

	  const delivery = new Delivery();
	  delivery.customer = customer;
	  delivery.product = product;
	  delivery.transaction = transaction;
	  delivery.deliveryStatus = 'pending';

	  const savedDelivery = await this.deliveryRepo.save(delivery);

	  // 🔄 Reducir el stock del producto
	  if (product.stock > 0) {
		product.stock -= 1;
		await this.productRepo.save(product);
	  }

	  return savedDelivery;
	}
}
