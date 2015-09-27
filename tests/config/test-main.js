/* global System */
/* global __karma__ */
/* global System */
/* global __karma__ */

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

// Set the base url of our scripts
System.baseURL = '/base/dist/dev/';
// Here we set all the preffixes so that we'll
// be able for example to import 'test/test_name'
// instead of 'scripts/build/test_name'
System.paths = {
    'app/controllers/*': '/base/dist/dev/app/controllers/*.js',
    'app/common/*': '/base/dist/dev/app/common/*.js',
    'app/services/*': '/base/dist/dev/app/services/*.js',
    'app/features/todo/*': '/base/dist/dev/app/features/todo/*.js',
    'app/models/*': '/base/dist/dev/app/models/*.js',
    'tests/unit/controllers/*': '/base/dist/dev/tests/unit/controllers/*.js',
    'tests/unit/features/todos/*': '/base/dist/dev/tests/unit/features/todos/*.js',
    'tests/unit/services/*': '/base/dist/dev/tests/unit/services/*.js',
    'angular/*': '/base/dist/dev/app/lib/angular.js'
};

// paths that include spec and ends with .js
function onlySpecFiles(path) {   
    return /Spec\.js$/.test(path);
}

// takes paths and normalize them to module names
// by removing a base url preffix and .js suffix
function karmaFileToModule(fileName) {
    return fileName.replace(System.baseURL, '')
      .replace('.js', '');

    //var str = fileName.split('\\').pop().split('/').pop()
    //return str.replace('.js', '');
}

Promise.all(
    Object.keys(window.__karma__.files) // Takes all files that served by karma
        .filter(onlySpecFiles)  // choose only test files
        .map(karmaFileToModule) // normalize them to module names
        .map(function (moduleName) {
           
            return System.import(moduleName) // import each module
                .then(function (module) {                  
                    if (module.hasOwnProperty('main')) {
                        module.main(); //expose the tests
                    } else {
                        throw new Error('Module ' + moduleName + ' does not implement main() method.');
                    }
                });
        })).then(function () {
            __karma__.start(); // after all tests were exposed 
        }, function (error) {
            console.error(error.stack || error);
            __karma__.start();
        });