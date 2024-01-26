module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['vue', 'js', 'ts'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
}