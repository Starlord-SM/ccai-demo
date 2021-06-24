module.exports = {
	preset: 'ts-jest',
	testPathIgnorePatterns: ['/node_modules/', '/lib/'],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!**/node_modules/**',
		'!src/index.tsx',
	],
	coverageThreshold: {
		'src/**/*.{js,jsx,ts,tsx}': {
			// Set these all to 30 - we just want to ensure that a file actually gets covered, we're not too worried
			// about actual coverage %ages _yet_
			statements: 30,
			branches: 30,
			functions: 30,
			lines: 30,
		},
	},
};
