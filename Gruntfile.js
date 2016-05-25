module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('gruntify-eslint');


  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'test/**/*.js'],
      options: {
        jshintrc: './.jshintrc'
      }
    },
    eslint: {
      src: ['errors/*.js', 'models/*.js']
    }
  });

  grunt.registerTask('default', ['jshint', 'eslint']);
};