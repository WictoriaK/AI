import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import {deleteAsync} from 'del';
import notify from 'gulp-notify';

const compileSass = gulpSass(sass);
const server = browserSync.create();

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', {sourcemaps: true})
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'Gulp error',
        message: '<%= error.message %>'
      })
    }))
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
    .pipe(server.stream());
}

export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('build'));
}


export const scripts = () => {
  return gulp.src('source/js/**/*.js', {sourcemaps: true})
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js',  { sourcemaps: '.' }))
    .pipe(server.stream());
}

export const images = () => {
  return gulp.src('source/img/**/*.{jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80 }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { name: 'removeViewBox', active: false }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));
}


export const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}


export const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff, otf, ttf}",
    "source/img/**/*.svg",
    "source/img/icons/*.svg",
  ],{
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

export const clean = () => {
  return deleteAsync('build');
}

// Server

export const serve = (done) => {
  server.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    open: true // можно включить/отключить, если нужно автооткрытие
  });
  done();
}

export const reload = (done) => {
  server.reload();
  done();
}

// Watcher

export const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}


// Build
export const build = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
  ),
);

export const dev =  gulp.series(
  build,
  serve,
  watcher
);

export default dev;
