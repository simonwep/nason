module.exports = {
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/**/*.ts'
    ]
};
