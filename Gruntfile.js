module.exports = function(grunt) {

	var BANNER = '/**\n * <%= pkg.name %> \n * version <%= pkg.version %> \n * <%=pkg.author %> \n * ' + '<%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n */' + '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: BANNER
			},
			painter: {
				src: ['src/intro.js', 'src/layer.js', 'src/painter.js', 'src/util.js', 'src/outro.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			painter: {
				options:{
					banner: BANNER
				},
				files:{
					'dist/<%= pkg.name %>.min.js':['dist/<%= pkg.name %>.js']
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask('default', ['concat','uglify']);
	
};