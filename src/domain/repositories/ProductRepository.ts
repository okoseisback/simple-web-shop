import { ProductModel } from '@app/infrastructure/database/models/ProductModel';
import prisma from '@app/infrastructure/database';

// Interface defining the methods for interacting with product data
export interface IProductRepository {
  getAll(): Promise<ProductModel[]>; // Method to retrieve all products
  getById(id: number): Promise<ProductModel | null>; // Method to retrieve a product by its ID
}

// Implementation of the product repository
export class ProductRepository implements IProductRepository {
  async getAll(): Promise<ProductModel[]> {
    // Retrieving all products including their associated brand information using Prisma
    const products = await prisma.product.findMany({ include: { brand: true } });
    return products; // Returning the retrieved products
  }

  async getById(id: number): Promise<ProductModel | null> {
    // Retrieving a product by its ID including its associated brand information using Prisma
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: { brand: true }
    });
    return product; // Returning the retrieved product or null if not found
  }
}
