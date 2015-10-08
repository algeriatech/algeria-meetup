var config = {
    sassImportPaths: ['vendors/'],

    paths: {
        images: {
            src:[
                'assets/images/**/*.gif',
                'assets/images/**/*.jpg',
                'assets/images/**/*.jpeg',
                'assets/images/**/*.png'
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
                    'vendors/q/q.js',
                    'vendors/qajax/src/qajax.js',

                    // Yaml Parser
                    'vendors/yaml-js/yaml.min.js',

                    // Handlebars. To ease templating.
                    'vendors/handlebars/handlebars.min.js',
                ],
                outFile: 'vendor.js',
                dest: 'js/'
            }
        }
    }
};

module.exports = config;