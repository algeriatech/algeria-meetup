var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    cssshrink       = require('gulp-cssshrink'),
    sass            = require('gulp-sass'), 
    rename          = require('gulp-rename'),
    autoprefixer    = require('gulp-autoprefixer'),
    header          = require('gulp-header'),
    changed         = require('gulp-changed'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),

    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    gifsicle        = require('imagemin-gifsicle'),
    jpegtran        = require('imagemin-jpegtran'),

    pkg             = require('./package.json'),
    config          = require('./build-config.js');


var date = require('moment')().format('MMMM Do YYYY, h:mm:ss');
var banner = [
  '/* **************************************************** ',
  ' * Algiers Developer Meetup — Website',
  ' * Built On: ' + date,
  ' ****************************************************** */ \n\n ', 
].join('\n');

// ################################################ 
// ###################### Styles ##################
// ################################################
gulp.task('compile:styles:main', function() {
    return gulp.src( config.paths.styles.main.src )
        .pipe( changed( config.paths.styles.main.dest ) )
        .pipe( sass({ includePaths: config.sassImportPaths }) )
        .pipe( autoprefixer({ browsers: ['last 30 versions'], cascade: true }) )
        .pipe( cssshrink() )
        .pipe( header( banner, { pkg: pkg }) )
        .pipe( gulp.dest( config.paths.styles.main.dest ) );
});


// ################################################ 
// ###################### Scripts #################
// ################################################ 
gulp.task('compile:scripts:main', function() {
    return gulp.src( config.paths.scripts.main.src )
        .pipe( changed( config.paths.scripts.main.dest ) )
        .pipe( concat( config.paths.scripts.main.outFile ) )
        .pipe(uglify())
        .pipe( header( banner, { pkg: pkg }) )
        .pipe( gulp.dest( config.paths.scripts.main.dest ) );
});

gulp.task('compile:scripts:vendor', function() {
    return gulp.src( config.paths.scripts.vendor.src )
        .pipe( changed( config.paths.scripts.vendor.dest ) )
        .pipe( concat( config.paths.scripts.vendor.outFile ) )
        .pipe(uglify())
        .pipe( header( banner, { pkg: pkg }) )
        .pipe( gulp.dest( config.paths.scripts.vendor.dest ) );
});

gulp.task('watch', function() {
    // Styles
    gulp.watch(config.paths.styles.main.src, ['compile:styles:main']);

    // Scripts
    gulp.watch(config.paths.scripts.main.src, ['compile:scripts:main']);
    gulp.watch(config.paths.scripts.vendor.src, ['compile:scripts:vendor']);
});

gulp.task('optimize:images', function() {
    return gulp.src(config.paths.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), gifsicle(), jpegtran()]
        }))
        .pipe(gulp.dest(config.paths.images.dest));
});

gulp.task('bundle', function() {
    gulp.start('compile:styles:main');
    gulp.start('compile:scripts:main');
    gulp.start('compile:scripts:vendor');
    gulp.start('optimize:images');
});