System.config({
    baseURL: '/',

    // Set path for third-party libraries as modules
    paths: {
        'test-main': 'tests/config/test-main.js',
        'systemjs': 'node_modules/systemjs/dist/system.js',
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
        'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
        'traceur': 'node_modules/traceur/bin/traceur-runtime.js'
    },

    servedFiles: [
               'dist/dev/app/**/*.js',
               'dist/dev/app/**/**/*.js',
               'dist/dev/tests/**/**/*Spec.js',
               'dist/dev/tests/**/**/**/*Spec.js'
    ],

    testFileSuffix: 'Spec.js',

    transpiler: 'traceur'
});