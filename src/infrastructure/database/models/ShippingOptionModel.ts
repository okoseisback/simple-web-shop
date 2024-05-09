/**
 * Interface representing the structure of a shipping option model.
 */
export interface ShippingOptionModel {
    id: number; // Unique identifier of the shipping option
    name: string; // Name of the shipping option
    description: string; // Description of the shipping option
    cost: number; // Cost of the shipping option
    createdAt: Date; // Date and time when the shipping option was created
  }
  