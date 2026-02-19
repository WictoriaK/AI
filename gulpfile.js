import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const server = browserSync.create();

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', {sourcemaps: '.'}))
    .pipe(server.stream());
}

// Server

export const serve = (done) => {
  server.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
    open: true // можно включить/отключить, если нужно автооткрытие
  });
  done();
}

// Watcher

export const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', server.reload);
}


export default gulp.series(
  styles,
  gulp.parallel(serve, watcher)
);
