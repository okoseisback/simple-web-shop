import prisma from '@app/infrastructure/database';
import { OrderRepository, IOrderRepository, IOrderProps } from '../OrderRepository';

// Mock OrderModel
jest.mock('@app/infrastructure/database/models/OrderModel', () => ({
  __esModule: true,
  default: {
    id: 1,
    productId: 1,
    totalProductValue: 100,
    totalShippingValue: 10,
    clientName: 'John Doe',
    clientAddress: '123 Main St',
    shippingOptionId: 1,
    createdAt: new Date()
  }
}));

describe('OrderRepository', () => {
  let orderRepository: IOrderRepository;

  beforeAll(() => {
    orderRepository = new OrderRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an order', async () => {
    const mockOrderProps: IOrderProps = {
      productId: 1,
      shippingId: 1,
      price: 100,
      cost: 10,
      clientName: 'John Doe',
      clientAddress: '123 Main St'
    };

    const mockOrderModel = {
      id: 1,
      productId: 1,
      totalProductValue: 100,
      totalShippingValue: 10,
      clientName: 'John Doe',
      clientAddress: '123 Main St',
      shippingOptionId: 1,
      createdAt: new Date()
    };

    const prismaCreateMock = jest.spyOn(prisma.order, 'create').mockResolvedValueOnce(mockOrderModel);

    const createdOrder = await orderRepository.create(mockOrderProps);

    expect(prismaCreateMock).toHaveBeenCalledWith({
      data: {
        product: {
          connect: { id: mockOrderProps.productId }
        },
        shippingOption: {
          connect: { id: mockOrderProps.shippingId }
        },
        totalProductValue: mockOrderProps.price,
        totalShippingValue: mockOrderProps.cost,
        clientName: mockOrderProps.clientName,
        clientAddress: mockOrderProps.clientAddress
      }
    });
    expect(createdOrder).toEqual(mockOrderModel);
  });

  it('should fetch order by id', async () => {
    const mockOrderModel = {
      id: 1,
      productId: 1,
      totalProductValue: 100,
      totalShippingValue: 10,
      clientName: 'John Doe',
      clientAddress: '123 Main St',
      shippingOptionId: 1,
      createdAt: new Date()
    };

    const prismaFindUniqueMock = jest.spyOn(prisma.order, 'findUnique').mockResolvedValueOnce(mockOrderModel);

    const orderId = 1;
    const retrievedOrder = await orderRepository.getById(orderId);

    expect(prismaFindUniqueMock).toHaveBeenCalledWith({
      where: {
        id: orderId
      }
    });
    expect(retrievedOrder).toEqual(mockOrderModel);
  });
});
