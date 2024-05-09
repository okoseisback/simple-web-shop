import { ShippingOptionModel } from '@app/infrastructure/database/models/ShippingOptionModel';
import { IShippingOptionRepository } from '@app/domain/repositories/ShippingOptionRepository';

// Interface defining the methods for shipping option-related operations
export interface IShippingOptionService {
  getAllShippingOptions(): Promise<ShippingOptionModel[]>; // Method to retrieve all shipping options
  getShippingOptionById(id: number): Promise<ShippingOptionModel | null>; // Method to retrieve a shipping option by its ID
}

// Implementation of the shipping option service
export class ShippingOptionService implements IShippingOptionService {
  private shippingOptionRepository: IShippingOptionRepository;

  constructor(shippingOptionRepository: IShippingOptionRepository) {
    this.shippingOptionRepository = shippingOptionRepository;
  }

  async getAllShippingOptions(): Promise<ShippingOptionModel[]> {
    // Delegating retrieval of all shipping options to the shipping option repository
    const shippingOptions = await this.shippingOptionRepository.getAll();
    return shippingOptions;
  }

  async getShippingOptionById(id: number): Promise<ShippingOptionModel | null> {
    // Delegating retrieval of a shipping option by ID to the shipping option repository
    return await this.shippingOptionRepository.getById(id);
  }
}
