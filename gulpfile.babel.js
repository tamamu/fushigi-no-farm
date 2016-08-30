import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();

const targets = [
  'src/*.js',
  'index.html',
];

gulp.task('babel', () =>
	browserify('src/main.js', {debug: true})
		.transform(babelify)
		.bundle()
		.on('error', (err) => console.log('Error : ' + err.message))
		.pipe(source('main.js'))
		//.pipe($.plumber())
		//.pipe($.sourcemaps.init())
		//.pipe($.babel())
		//.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
);

gulp.task('watch', () =>
	gulp.watch('src/*.js', ['babel', 'reload'])
);

gulp.task('webserver', () => gulp.src('./').pipe($.webserver({
  host: 'localhost',
  port: 8000,
  livereload: true,
  open: true
})));

gulp.task('reload', () =>
	gulp.src(targets)
		.pipe($.webserver.reload())
);

gulp.task('default', ['webserver', 'watch']);
