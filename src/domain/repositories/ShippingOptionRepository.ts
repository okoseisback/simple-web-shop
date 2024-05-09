import prisma from '@app/infrastructure/database';
import { ShippingOptionModel } from '@app/infrastructure/database/models/ShippingOptionModel';

// Interface defining the methods for interacting with shipping option data
export interface IShippingOptionRepository {
  getAll(): Promise<ShippingOptionModel[]>; // Method to retrieve all shipping options
  getById(id: number): Promise<ShippingOptionModel | null>; // Method to retrieve a shipping option by its ID
}

// Implementation of the shipping option repository
export class ShippingOptionRepository implements IShippingOptionRepository {
  async getAll(): Promise<ShippingOptionModel[]> {
    // Retrieving all shipping options using Prisma
    const shippingOptions = await prisma.shippingOption.findMany({});
    return shippingOptions; // Returning the retrieved shipping options
  }

  async getById(id: number): Promise<ShippingOptionModel | null> {
    // Retrieving a shipping option by its ID using Prisma
    const shippingOption = await prisma.shippingOption.findUnique({
      where: {
        id,
      },
    });
    return shippingOption; // Returning the retrieved shipping option or null if not found
  }
}
