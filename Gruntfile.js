module.exports = function(grunt) {

    let screepsConfig = require("./screeps");

    let branchName = grunt.option('branch') || screepsConfig.defaultBranch;

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

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
        },

        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g,'_');
                    }
                }],
            }
        }
    });

    grunt.registerTask('default',  ['clean', 'copy:screeps', 'replace', 'screeps']);

    grunt.registerTask('replace', 'Replaces file paths with _', function () {
        grunt.file.recurse('./dist', ReplaceImports);
    });

    // This task was not written by me, got it from here: https://www.reddit.com/r/screeps/comments/8pa6uk/grunt_screeps_with_folders/
    // It isn't ideal, has a problem with relative links that we could try and fix
    let ReplaceImports = function (abspath, rootdir, subdir, filename) {
        if (abspath.match(/.js$/) == null) {
            return;
        }
        let file = grunt.file.read(abspath);
        let updatedFile = '';

        let lines = file.split('\n');
        for (let line of lines) {
            // Compiler: IgnoreLine
            if ((line).match(/[.]*\/\/ Compiler: IgnoreLine[.]*/)) {
                continue;
            }
            let reqStr = line.match(/(?:require\(")([^_a-zA-Z0-9]*)([^"]*)/);
            if (reqStr && reqStr !== "") {
                let reqPath = subdir ? subdir.split('/') : []; // relative path
                let upPaths = line.match(/\.\.\//gi);
                if (upPaths) {
                    for (let i in upPaths) {
                        reqPath.splice(reqPath.length - 1);
                    }
                } else {
                    let isRelative = line.match(/\.\//gi);
                    if (!isRelative || isRelative === "") {
                        // absolute path
                        reqPath = [];
                    }
                }

                let rePathed = "";
                if (reqPath && reqPath.length > 0) {
                    while (reqPath.length > 0) {

                        rePathed += reqPath.shift() + "_";
                    }
                }
                line = line.replace(/require\("([.\/]*)([^"]*)/, "require\(\"" + rePathed + "$2").replace(/\//gi, '_');
            }

            updatedFile += (line + '\n');
        }

        grunt.file.write((rootdir + '/' + (subdir ? subdir + '/' : '') + filename), updatedFile);
    }
}