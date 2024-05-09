import type { JestConfigWithTsJest } from 'ts-jest'; // Importing JestConfigWithTsJest type from ts-jest

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest', // Using ts-jest preset for TypeScript support
    testEnvironment: 'node', // Specifying the test environment as Node.js
    testMatch: ['**/*.test.ts'], // Matching test files with a pattern (e.g., all files ending with .test.ts)
    moduleNameMapper: { // Mapping module paths
        '^@app/(.*)$': '<rootDir>/src/$1', // Mapping '@app/*' to 'src/*'
    }
};

export default jestConfig; // Exporting the Jest configuration object
