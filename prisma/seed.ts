// Import the PrismaClient from the Prisma client library
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient
const prisma = new PrismaClient();

// Define an async function to seed the database
async function seed() {
    try {
        // Create Brands
        const brandA = await prisma.brand.create({
            data: {
                name: 'Vans'
            }
        });

        const brandB = await prisma.brand.create({
            data: {
                name: 'Eastpak'
            }
        });

        // Create Products
        await prisma.product.createMany({
            data: [
                {
                    brandId: brandA.id,
                    name: 'Shoes',
                    price: 50
                },
                {
                    brandId: brandA.id,
                    name: 'T-shirt',
                    price: 25
                },
                {
                    brandId: brandA.id,
                    name: 'Backpack',
                    price: 70
                },
                {
                    brandId: brandB.id,
                    name: 'Backpack',
                    price: 80
                },
                {
                    brandId: brandB.id,
                    name: 'Wallet',
                    price: 30
                }
            ]
        });

        // Create Shipping Options
        await prisma.shippingOption.create({
            data: {
                name: 'Free',
                description: 'Standard (Free)',
                cost: 0
            }
        });

        await prisma.shippingOption.create({
            data: {
                name: 'Express',
                description: 'Express (10 EUR)',
                cost: 10
            }
        });

        console.log('Seeding process completed successfully.');
    } catch (error) {
        console.error('Error occurred during seeding:', error);
    } finally {
        // Disconnect PrismaClient after seeding
        await prisma.$disconnect();
    }
}

// Execute the seeding function
seed();
