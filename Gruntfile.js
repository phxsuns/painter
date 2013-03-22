module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			painter: {
				src: ['src/intro.js', 'src/layer.js', 'src/painter.js', 'src/outro.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			painter: {
				options:{
					//beautify: true
				},
				files:{
					'dist/<%= pkg.name %>.min.js':['dist/<%= pkg.name %>.js']
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	//grunt.registerTask('default', ['uglify']);
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask('default', ['concat','uglify']);
	
};