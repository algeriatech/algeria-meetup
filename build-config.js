var config = {
    sassImportPaths: [
        JSON.parse(require('fs').readFileSync('./.bowerrc')).directory
        // Add any sass import paths in here:
        // ... 
    ],

    paths: {
        images: {
            src:[
                'assets/images/**/*.{gif,png,jpg,jpeg}',
            ],
            dest: 'images/'
        },

        styles: {
            main: {
                src: [
                    // Main Files
                    'assets/sass/main/**/*.scss',
                    
                    // Vendor File
                    'assets/sass/vendor.scss'
                ],
                dest: 'css/'
            },
        },

        scripts: {
            main: {
                src: [
                    'assets/js/init.js',
                ],
                outFile: 'main.js',
                dest: 'js/'
            },

            vendor: {
                src: [
                    // A Library to help with ajax requests. The first one is actually just a dependency.
                    'vendor/q/q.js',
                    'vendor/qajax/src/qajax.js',

                    // Yaml Parser
                    'vendor/yaml-js/yaml.min.js',

                    // Handlebars. To ease templating.
                    'vendor/handlebars/handlebars.min.js',
                ],
                outFile: 'vendor.js',
                dest: 'js/'
            }
        }
    }
};

module.exports = config;