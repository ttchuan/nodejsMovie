module.exports = function (grunt) {
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options: {
					liverload: true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks:['jshint'],
				options:{
					liverload:true
				}
			}
		},

		nodemon:{
				dev:{
					options:{
						file:'app.js',
						args:[],
						ignoredFiles:['README.md','node_modules/**'],
						wacthExtensions:['js'],
						watchFolders:['app','config'],
						debug:true,
						delayTime:1,
						env:{
							PORT:3000
						},
						cwd:__dirname
					}
				}
		},

		concurrent: {
	        target: {
	            tasks: ['nodemon', 'watch'],
	            options: {
	                logConcurrentOutput: true
	            }
	        }
	    }
	})
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.option('force',true)
	grunt.registerTask('default',['concurrent'])
}