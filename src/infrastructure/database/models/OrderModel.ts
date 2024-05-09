/**
 * Interface representing the structure of an order model.
 */
export interface OrderModel {
    id: number; // Unique identifier of the order
    productId: number; // ID of the associated product
    totalProductValue: number; // Total value of the product in the order
    totalShippingValue: number; // Total value of shipping for the order
    clientName: string; // Name of the client who placed the order
    clientAddress: string; // Address of the client
    shippingOptionId: number; // ID of the selected shipping option
    createdAt: Date; // Date and time when the order was created
  }
  