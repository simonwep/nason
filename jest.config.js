module.exports = {
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/**/*.ts'
    ],
    globals: {
        'VERSION': true
    }
};
