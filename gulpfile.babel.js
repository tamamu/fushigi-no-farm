import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();


gulp.task('babel', () =>
	browserify('src/main.js', { debug: true })
		.transform(babelify)
		.bundle()
		.on('error', (err) => console.log(`Error : ${err.message}`))
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
	gulp.watch('src/*.js', ['babel'])
);

gulp.task('webserver', () => gulp.src('./').pipe($.webserver({
  host: 'localhost',
  port: 8000,
  livereload: {
    enable: true,
    filter: (filename) => {
      if (filename.match(/src\/.*\.js/)) {
        return false;
      }
      return true;
    }
  },
  open: false
})));

gulp.task('default', ['babel', 'webserver', 'watch']);
