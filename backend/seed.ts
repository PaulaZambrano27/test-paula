import { DataSource } from 'typeorm';
import { Product } from './src/products/entities/product.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Paz.2025++', // cambia esto si pusiste otra
  database: 'test_paula',
  entities: [Product],
  synchronize: true,
});

const seed = async () => {
  await AppDataSource.initialize();

  const productRepo = AppDataSource.getRepository(Product);

  const products = [
    {
      name: 'Camiseta Roja',
      description: 'Talla M, algodón 100%',
      price: 45000,
      stock: 10,
    },
    {
      name: 'Zapatos Negros',
      description: 'Cuero legítimo, talla 39',
      price: 120000,
      stock: 5,
    },
    {
      name: 'Gorra Blanca',
      description: 'Unitalla, fresca',
      price: 25000,
      stock: 20,
    },
  ];

  for (const data of products) {
    const product = productRepo.create(data);
    await productRepo.save(product);
    console.log(`✅ Producto insertado: ${data.name}`);
  }

  await AppDataSource.destroy();
  console.log('🎉 Seed completado con éxito');
};

seed().catch((e) => {
  console.error('❌ Error al hacer seed:', e);
});
