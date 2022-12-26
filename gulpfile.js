const gulp = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const sourcemap = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const terser = require('gulp-terser');
const sync = require('browser-sync').create();

// HTML

const html = () => {
  return gulp.src('source/**/*.html')
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    // .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      // csso()
    ]))
    .pipe(rename('new.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

// Styles2

const styles2 = () => {
  return gulp.src('source/sass/style.scss')
    // .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('new.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles2 = styles2;

// Styles3

const styles3 = () => {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles3 = styles3;

// Images

const optimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    'source/files/**/*.{png,jpg,svg}'
  ], {
    base: 'source'
  })
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('build'))
}

exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    'source/files/**/*.{png,jpg,svg}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

exports.images = copyImages;

// WebP

// const createWebp = () => {
//   return gulp.src([
//     'source/img/**/*.{jpg,png}',
//     '!source/img/backgrounds/**',
//     '!source/img/favicons/**',
//     '!source/img/location-pin.png',
//     'source/files/**/*.{jpg,png}'
//   ], {
//     base: 'source'
//   })
//     .pipe(webp({quality: 90}))
//     .pipe(gulp.dest('build'));
// }

const createWebp = () => {
  return gulp.src([
    'source/img/stone/hero/*.{jpg,png}',
    'source/img/team/*.{jpg,png}',
    'source/img/current-offers/*.{jpg,png}'
  ], {
    base: 'source'
  })
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build'));
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src('source/img/copyright-logo.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/css/*.css',
    '!source/css/umnyash.css',
    'source/js/**/*.js',
    '!source/js/umnyash.js',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

exports.copy = copy;

// Scripts

const scripts = () => {
  return gulp.src('source/js/new.js')
    // .pipe(terser())
    // .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Scripts2

const scripts2 = () => {
  return gulp.src('source/js/new.js')
    .pipe(terser())
    .pipe(rename('new.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}

exports.scripts2 = scripts2;

// Clean

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = () => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles2));
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    styles2,
    styles3,
    html,
    scripts,
    scripts2,
    createWebp
    // sprite,
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    styles2,
    styles3,
    html,
    scripts,
    scripts2,
    createWebp
    // sprite,
  ),
  server,
  watcher
);
