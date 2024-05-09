import { NextFunction, Request, Response } from 'express';
import { handleError } from '@app/infrastructure/http/middlewares';
import { z } from 'zod';

import { IProductService } from '@app/domain/services/ProductService';
import { ProductModel } from '@app/infrastructure/database/models/ProductModel';

import { IShippingOptionService } from '@app/domain/services/ShippingOptionService';
import { ShippingOptionModel } from '@app/infrastructure/database/models/ShippingOptionModel';

import { IOrderService } from '@app/domain/services/OrderService';
import { OrderModel } from '@app/infrastructure/database/models/OrderModel';

import EmailService from '@app/domain/services/EmailService';

import { STATUS_CODES, RESP_ERROR_MESSAGES } from '@app/constants/messages';

// Zod schema for purchase request validation
export const purchaseZodSchema = z.object({
  productId: z.string().min(1),
  shippingId: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  ccHolder: z.string().min(1),
  ccExpMonth: z.string().min(1).max(2),
  ccExpYear: z.string().min(1).max(2),
  ccNo: z.string().min(16).max(16),
  ccCvc: z.string().min(3).max(4),
});

// Controller for handling product-related requests
export class ProductController {
  private productService: IProductService;
  private shippingOptionService: IShippingOptionService;
  private orderService: IOrderService;

  constructor(productService: IProductService, shippingOptionService: IShippingOptionService, orderService: IOrderService) {
    this.productService = productService;
    this.shippingOptionService = shippingOptionService;
    this.orderService = orderService;
  }

  // Handler for rendering the products page
  async getProductsPage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products: ProductModel[] = await this.productService.getAllProducts();
      res.render('products', { products });
    } catch (error) {
      handleError(res, next, error);
    }
  }

  // Handler for rendering the checkout page for a specific product
  async getProductCheckout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId: number = parseInt(req.params.id, 10);
      const product: ProductModel | null = await this.productService.getProductById(productId);
      if (product) {
        const shippingOptions: ShippingOptionModel[] | null = await this.shippingOptionService.getAllShippingOptions();
        res.render('checkout', { product, shippingOptions });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send(RESP_ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }
    } catch (error) {
      handleError(res, next, error);
    }
  }

  // Handler for processing a product purchase request
  async postProductPurchase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, shippingId, name, address } = purchaseZodSchema.parse(req.body);

      const product: ProductModel | null = await this.productService.getProductById(parseInt(productId));
      if (product) {
        const shippingOption: ShippingOptionModel | null = await this.shippingOptionService.getShippingOptionById(parseInt(shippingId));

        if (!shippingOption) {
          res.status(STATUS_CODES.NOT_FOUND).send(RESP_ERROR_MESSAGES.SHIPPING_OPTION_NOT_FOUND);
          return;
        }

        const order = await this.orderService.create({
          productId: parseInt(productId),
          shippingId: parseInt(shippingId),
          price: product.price,
          cost: shippingOption.cost,
          clientName: name,
          clientAddress: address
        });

        if (!order) {
          res.status(STATUS_CODES.NOT_FOUND).send(RESP_ERROR_MESSAGES.ORDER_CREATE_ERROR);
          return;
        }
        const emailService = new EmailService();
        await emailService.sendOrderNotification(order);

        res.render('purchase', { order });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send(RESP_ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }
    } catch (error) {
      handleError(res, next, error);
    }
  }

  // Handler for rendering the thank you page for a completed order
  async getProductThankYou(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderId: number = parseInt(req.params.id, 10);
      const order: OrderModel | null = await this.orderService.getById(orderId);
      if (order) {
        res.render('thanks', { order });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send(RESP_ERROR_MESSAGES.ORDER_NOT_FOUND);
      }
    } catch (error) {
      handleError(res, next, error);
    }
  }
}
