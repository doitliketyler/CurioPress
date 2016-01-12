// Plugins
var
  brsync   = require('browser-sync').create(),
  breload  = brsync.reload,
  brwsrfy  = require('browserify'),
  del      = require('del'),
  gulp     = require('gulp'),
  autoprfx = require('gulp-autoprefixer'),
  cache    = require('gulp-cache'),
  concat   = require('gulp-concat'),
  cssnano  = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  jshint   = require('gulp-jshint'),
  notify   = require('gulp-notify'),
  plumber  = require('gulp-plumber'),
  rename   = require('gulp-rename'),
  sass     = require('gulp-ruby-sass'),
  size     = require('gulp-size'),
  srcmaps  = require('gulp-sourcemaps'),
  uglify   = require('gulp-uglify'),
  util     = require('gulp-util'),
  vbuffer  = require('vinyl-buffer'),
  vsource  = require('vinyl-source-stream');

// Browser-Sync  
gulp.task('br-sync', function() {
  // Watch
  var files = [
    './style.css',
    './js',
    './*.php'
  ];
  // Initialize
  brsync.init(files, {
	  // Project Address 
    proxy: "192.168.33.10/curiopress/",
    notify: false
  });
});

// Optimize Images
gulp.task('images', function() {
	return gulp.src('src/img/*')
	  .pipe(imagemin({
	    progressive: true,
	    svgoPlugins: [{removeViewBox: false}]
	  }))
	  .pipe(gulp.dest('./img'))
	  .pipe(breload({
      stream: true
    }))
    .pipe(notify({
      message: 'Images Optimized'
    }));      
});

// Compile Sass
gulp.task('sass', function() {
  return sass('src/sass/*.scss')
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(gulp.dest('./'))
    .pipe(breload({
      stream: true
    }))
    .pipe(notify({
      message: 'Sass Compiled'
    }));
});

// Browserify JavaScript
gulp.task('scripts', function(cb) {
  // set up the browserify instance on a task basis
  var b = brwsrfy({
    entries: './src/js/main.js',
    debug: true
  });
  return b.bundle()
    .pipe(vsource('./js/main.js'))
    .pipe(vbuffer())
    .pipe(srcmaps.init({
      loadMaps: true
    }))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', util.log)
    .pipe(notify({
      message: 'JS Browserified'
    }))
    .pipe(srcmaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(breload({
      stream: true
    }))
  cb(err);
});

// JSHint JavaScript
gulp.task('jshint', ['scripts'], function() {
  return gulp.src('src/js/*.js')
  	.pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({
      message: 'JS Hinted'
    }));
});

// Size
gulp.task('size', function () {
	var s = size();
	return gulp.src('style.css')
		.pipe(s)
		.pipe(gulp.dest('src'))
		.pipe(notify({
			onLast: true,
			message: function () {
				return 'Total Project Size ' + s.prettySize;
			}
		}));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/js/**/*.js', ['jshint']);

});

// Cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Clean
gulp.task('clean', function() {
  return del(['style.css', 'js'])
});

// Start
gulp.task('start', ['clean'], function() {
  gulp.start('images', 'sass', 'scripts', 'jshint');
});

// Default
gulp.task('default', ['clean', 'images', 'sass', 'scripts', 'jshint', 'br-sync'], function() {
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/js/**/*.js', ['jshint']);
});