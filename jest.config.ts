/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const config: Config = {
	clearMocks: true,
	preset: 'ts-jest',
	roots: [
		"<rootDir>"
	],
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ['<rootDir>/src/test/setup-jest.ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1'
	}
};

export default config;
