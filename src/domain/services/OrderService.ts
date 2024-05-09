import { OrderModel } from '@app/infrastructure/database/models/OrderModel';
import { IOrderProps, IOrderRepository } from '@app/domain/repositories/OrderRepository';

// Interface defining the methods for order-related operations
export interface IOrderService {
  create(props: IOrderProps): Promise<OrderModel>; // Method to create a new order
  getById(id: number): Promise<OrderModel | null>; // Method to retrieve an order by its ID
}

// Implementation of the order service
export class OrderService implements IOrderService {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async create(props: IOrderProps): Promise<OrderModel> {
    // Delegating order creation to the order repository
    return await this.orderRepository.create(props);
  }

  async getById(id: number): Promise<OrderModel | null> {
    // Delegating order retrieval by ID to the order repository
    return await this.orderRepository.getById(id);
  }
}
