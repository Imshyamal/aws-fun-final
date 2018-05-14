module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            build: {
                "src": [
                    "front-end/*.js",
                    "front-end/controllers/*.js"
                ],
                "dest": "public/javascripts/aws_fun_app.js"
            },
            lib: {
                "src": [
                    "node_modules/angular/angular.js",
                    "node_modules/angular-material/angular-material.js",
                    "node_modules/angular-aria/angular-aria.js",
                    "node_modules/angular-animate/angular-animate.js",
                    'node_modules/angular-messages/angular-messages.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.js'
                ],
                "dest": 'public/javascripts/aws-lib.js'
            },
            css: {
                src: [
                    "node_modules/angular-material/angular-material.css",
                    "front-end/app.css"
                ],
                dest: 'public/stylesheets/main.css'


            }
        }
    });

    // Load required modules //uglify
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};