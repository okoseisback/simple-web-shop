import { ShippingOptionRepository, IShippingOptionRepository } from '../ShippingOptionRepository';
import prisma from '@app/infrastructure/database';

// Mock ShippingOptionModel
jest.mock('@app/infrastructure/database/models/ShippingOptionModel', () => ({
    __esModule: true,
    default: {
        id: 1,
        name: 'Test Shipping Option',
        description: 'Test Description',
        cost: 10,
        createdAt: new Date()
    }
}));

describe('ShippingOptionRepository', () => {
    let shippingOptionRepository: IShippingOptionRepository;

    beforeAll(() => {
        shippingOptionRepository = new ShippingOptionRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all shipping options', async () => {
        const mockShippingOptions = [{
            id: 1,
            name: 'Test Shipping Option',
            description: 'Test Description',
            cost: 10,
            createdAt: new Date()
        }];

        const prismaFindManyMock = jest.spyOn(prisma.shippingOption, 'findMany').mockResolvedValueOnce(mockShippingOptions);

        const shippingOptions = await shippingOptionRepository.getAll();

        expect(prismaFindManyMock).toHaveBeenCalledTimes(1);
        expect(shippingOptions).toEqual(mockShippingOptions);
    });

    it('should fetch shipping option by id', async () => {
        const mockShippingOption = {
            id: 1,
            name: 'Test Shipping Option',
            description: 'Test Description',
            cost: 10,
            createdAt: new Date()
        };

        const prismaFindUniqueMock = jest.spyOn(prisma.shippingOption, 'findUnique').mockResolvedValueOnce(mockShippingOption);

        const shippingOptionId = 1;
        const shippingOption = await shippingOptionRepository.getById(shippingOptionId);

        expect(prismaFindUniqueMock).toHaveBeenCalledWith({
            where: {
                id: shippingOptionId
            }
        });
        expect(shippingOption).toEqual(mockShippingOption);
    });
});
