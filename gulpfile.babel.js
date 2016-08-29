import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

const targets = [
	'src/scripts/**/*.js',
	'index.html',
];

gulp.task('babel', () => 
	gulp.src('src/scripts/**/*.js')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write("."))
		.pipe(gulp.dest('dist'))
)

gulp.task('watch', () =>
	gulp.watch('src/scripts/**/*.js', ['babel', 'reload'])
)

gulp.task('webserver', () =>
	gulp.src('./')
		.pipe($.webserver({
			host: 'localhost',
			port: 8000,
			livereload: true,
		}))
)

gulp.task('reload', () =>
	gulp.src(targets)
		.pipe($.webserver.reload())
)

gulp.task('default', ['webserver', 'watch'])
