import prisma from '@app/infrastructure/database';
import { OrderModel } from '@app/infrastructure/database/models/OrderModel';
import { RESP_ERROR_MESSAGES } from '@app/constants/messages';

// Interface defining the properties of an order
export interface IOrderProps {
  productId: number; // ID of the product associated with the order
  shippingId: number; // ID of the shipping option chosen for the order
  price: number; // Total price of the product
  cost: number; // Total cost of shipping
  clientName: string; // Name of the client placing the order
  clientAddress: string; // Address of the client
}

// Interface defining the methods for interacting with order data
export interface IOrderRepository {
  create(props: IOrderProps): Promise<OrderModel>; // Method to create an order
  getById(id: number): Promise<OrderModel | null>; // Method to retrieve an order by its ID
}

// Implementation of the order repository
export class OrderRepository implements IOrderRepository {
  async create(props: IOrderProps): Promise<OrderModel> {
    // Creating a new order using Prisma
    const order = await prisma.order.create({
      data: {
        product: {
          connect: { id: props.productId } // Associating the order with the specified product
        },
        shippingOption: {
          connect: { id: props.shippingId } // Associating the order with the chosen shipping option
        },
        totalProductValue: props.price, // Setting the total price of the product
        totalShippingValue: props.cost, // Setting the total cost of shipping
        clientName: props.clientName, // Setting the client's name
        clientAddress: props.clientAddress // Setting the client's address
      }
    });
    
    // If order creation fails, throwing an error
    if (!order) {
      throw new Error(RESP_ERROR_MESSAGES.ORDER_CREATE_ERROR);
    }
    
    return order; // Returning the created order
  }

  async getById(id: number): Promise<OrderModel | null> {
    // Retrieving an order by its ID using Prisma
    const order = await prisma.order.findUnique({
      where: {
        id,
      }
    });
    
    return order; // Returning the retrieved order or null if not found
  }
}
