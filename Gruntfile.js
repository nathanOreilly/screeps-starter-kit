module.exports = function(grunt) {

    let screepsConfig = require("./screeps");

    let branchName = grunt.option('branch') || screepsConfig.defaultBranch;

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: screepsConfig.credentials.email,
                token: screepsConfig.credentials.token,
                branch: branchName
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}