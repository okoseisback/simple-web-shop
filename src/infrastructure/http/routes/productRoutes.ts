import express from 'express';

import { ProductController } from '@app/infrastructure/http/controllers/ProductController';
import { ProductService } from '@app/domain/services/ProductService';
import { ProductRepository } from '@app/domain/repositories/ProductRepository';

import { ShippingOptionRepository } from '@app/domain/repositories/ShippingOptionRepository';
import { ShippingOptionService } from '@app/domain/services/ShippingOptionService';

import { OrderRepository } from '@app/domain/repositories/OrderRepository';
import { OrderService } from '@app/domain/services/OrderService';

// Creating an Express router
const router = express.Router();

// Initializing repositories and services
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const shippingOptionRepository = new ShippingOptionRepository();
const shippingOptionService = new ShippingOptionService(shippingOptionRepository);

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

// Initializing the product controller with the required services
const productController = new ProductController(productService, shippingOptionService, orderService);

// Defining routes
router.get('/', productController.getProductsPage.bind(productController)); // Route for rendering the products page
router.get('/checkout/:id', productController.getProductCheckout.bind(productController)); // Route for rendering the checkout page for a product
router.post('/purchase', productController.postProductPurchase.bind(productController)); // Route for processing a product purchase
router.get('/thanks/:id', productController.getProductThankYou.bind(productController)); // Route for rendering the thank you page for an order

export default router; // Exporting the router
