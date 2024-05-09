import prisma from '@app/infrastructure/database';
import { ProductRepository, IProductRepository } from '../ProductRepository';

// Mock ProductModel
jest.mock('@app/infrastructure/database/models/ProductModel', () => ({
  __esModule: true,
  default: {
    id: 1,
    name: 'Test Product',
    brandId: 1,
    price: 50,
    brand: {
      id: 1,
      name: 'Test Brand'
    }
  }
}));

describe('ProductRepository', () => {
  let productRepository: IProductRepository;

  beforeAll(() => {
    productRepository = new ProductRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all products', async () => {
    const mockProducts = [{
      id: 1,
      name: 'Test Product',
      brandId: 1,
      price: 50,
      brand: {
        id: 1,
        name: 'Test Brand'
      }
    }];

    const prismaFindManyMock = jest.spyOn(prisma.product, 'findMany').mockResolvedValueOnce(mockProducts);

    const products = await productRepository.getAll();

    expect(prismaFindManyMock).toHaveBeenCalledTimes(1);
    expect(products).toEqual(mockProducts);
  });

  it('should fetch product by id', async () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      brandId: 1,
      price: 50,
      brand: {
        id: 1,
        name: 'Test Brand'
      }
    };

    const prismaFindUniqueMock = jest.spyOn(prisma.product, 'findUnique').mockResolvedValueOnce(mockProduct);

    const productId = 1;
    const product = await productRepository.getById(productId);

    expect(prismaFindUniqueMock).toHaveBeenCalledWith({
      where: {
        id: productId
      },
      include: { brand: true }
    });
    expect(product).toEqual(mockProduct);
  });
});
