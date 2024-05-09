import { ProductModel } from '@app/infrastructure/database/models/ProductModel';
import { IProductRepository } from '@app/domain/repositories/ProductRepository';

// Interface defining the methods for product-related operations
export interface IProductService {
  getAllProducts(): Promise<ProductModel[]>; // Method to retrieve all products
  getProductById(id: number): Promise<ProductModel | null>; // Method to retrieve a product by its ID
}

// Implementation of the product service
export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<ProductModel[]> {
    // Delegating retrieval of all products to the product repository
    return await this.productRepository.getAll();
  }

  async getProductById(id: number): Promise<ProductModel | null> {
    // Delegating retrieval of a product by ID to the product repository
    return await this.productRepository.getById(id);
  }
}
