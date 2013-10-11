'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json' ),
    	build: {
    		src: 'src',
    		out: 'out'
    	},
        watch: {
        	src: {
		        files: ['<%= build.src %>/**/*.{html,htm,js,css}'],
		        options: { livereload: true }
        	},
        	assemble: {
		        files: [
		        	'<%= assemble.pages.src %>',
		        	'<%= assemble.options.layoutdir %>/*.hbs',
		        	'<%= assemble.options.data %>',
		        	'<%= assemble.options.partials %>'
		        ],
		        tasks: ['clean:out','assemble:pages'],
		        options: { livereload: true }
        	}
        },
        connect: {
	      server: {
	        options: {
	          port: 9000,
	          hostname: 'localhost',
	          base: ['<%= build.src %>','<%= build.out %>'],
	          livereload: true,
	          open: true
	        }
	      }
	    },
        assemble: {
            options: {
                flatten: true,
                partials: '<%= build.src %>/_partials/*.hbs',
                layoutdir: '<%= build.src %>/_layouts',
                pkg: '<%= pkg %>',
                data: '<%= build.src %>/_data/*.{json,yml}',
                date: new Date()
            },
            pages: {
            	options: {
            		layout: 'page.hbs'
            	},
            	src: ['<%= build.src %>/*.hbs'],
            	dest: '<%= build.out %>/'
            }
        },
        clean: {
	      options: { force: false },
	      out: ['<%= build.out %>/*']
	    },
	    copy: {
	      src: {
	      	expand: true,
	      	cwd: '<%= build.src %>/',
	      	src: ['**','!**/*.hbs','!_*/**'],
	      	dest: '<%= build.out %>/'
	      }
	    }
    });

    grunt.loadNpmTasks('assemble');

    grunt.registerTask('server', ['connect','watch']);
    grunt.registerTask('run', ['clean','assemble','server']);
    grunt.registerTask('build', ['clean','assemble','copy']);

    grunt.registerTask('default', ['server']);

};
