module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    coverageReporters: [
        "clover"
    ],
    coverageDirectory: 'coverage',
    rootDir: './',
    transform: {
        '^.+\\.js?$': 'babel-jest',
    },
    setupFiles: [
        "jest-canvas-mock"
    ]
}
