/*****************************************************************************/
/********************************** CONFIG ***********************************/
/*****************************************************************************/

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  ts = require('gulp-typescript'),
  merge = require('merge-stream'),
  imagemin = require('gulp-imagemin'),
  spritesmith = require('gulp.spritesmith'),
  buffer = require('vinyl-buffer');

var paths = {
  webroot: "./RawAssets/",
  pluginswebroot: "./Libs/"
};

paths.html = paths.webroot + "pages/**/*.{aspx,html}";
paths.images = paths.webroot + "images/**/*.{jpg,jpeg,png,bmp,gif}";
paths.fonts = paths.webroot + "fonts/**/*.{eot,svg,ttf,woff,woff2}";
paths.ts = paths.webroot + "ts/**/*.ts";
paths.compiledTs = paths.webroot + "scripts/";
paths.sass = paths.webroot + "sass/**/*.{scss,sass}";
paths.compiledSass = paths.webroot + "styles/";
paths.js = [paths.webroot + "scripts/**/*.js", '!' + paths.webroot + "scripts/**/*.min.js"];
paths.css = [paths.webroot + "styles/**/*.css", '!' + paths.webroot + "styles/**/*.min.css"];
paths.plugins = [paths.pluginswebroot + '**/*.{min.js,min.css,map,eot,svg,ttf,woff,woff2}'];


/*****************************************************************************/
/********************************** TASKS ************************************/
/*****************************************************************************/

gulp.task('default', ['css', 'index', 'home', 'data-tables', 'company-data-table', 'user-data-table', 'driver-data-table', 'garage-data-table']);

gulp.task('images', function () {
  var spriteData = gulp.src(paths.images).pipe(spritesmith({
    imgName: '../images/frozen-icons.png',
    cssName: 'frozen-icons.min.css',
    cssOpts: {
      cssSelector: function (sprite) {
        return '.frozen-' + sprite.name;
      }
    }
  }));

  // criação do sprite
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('SiteAssets/images/'));

  // criação do arquivo css
  var cssStream = spriteData.css
    .pipe(csso())
    .pipe(gulp.dest('SiteAssets/styles/'));
  return merge(imgStream, cssStream);
});

gulp.task('ts', function () {
  return gulp.src(paths.ts)
    .pipe(ts({
      target: 'es5'
    }))
    .pipe(gulp.dest(paths.compiledTs));
});

gulp.task('js', ['ts'], function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('css', ['sass'], function () {
  return gulp.src(paths.css)
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('SiteAssets/styles'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.compiledSass));
});

gulp.task('global', function () {
  return gulp.src(paths.webroot + 'ts/global.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'global.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('index', function () {
  return gulp.src(paths.webroot + 'ts/index.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'index.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('data-tables', function () {
  return gulp.src(paths.webroot + 'ts/data-tables.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'data-tables.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('home', function () {
  return gulp.src(paths.webroot + 'ts/home.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'home.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('trip-data-table', function () {
  return gulp.src(paths.webroot + 'ts/trip-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'trip-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('vehicle-master-detail', function () {
  return gulp.src(paths.webroot + 'ts/vehicle-master-detail.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'vehicle-master-detail.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('trip-master-detail', function () {
  return gulp.src(paths.webroot + 'ts/trip-master-detail.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'trip-master-detail.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('company-data-table', function () {
  return gulp.src(paths.webroot + 'ts/company-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'company-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('user-data-table', function () {
  return gulp.src(paths.webroot + 'ts/user-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'user-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('driver-data-table', function () {
  return gulp.src(paths.webroot + 'ts/driver-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'driver-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('garage-data-table', function () {
  return gulp.src(paths.webroot + 'ts/garage-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'garage-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    //.pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

gulp.task('vehicle-data-table', function () {
  return gulp.src(paths.webroot + 'ts/vehicle-data-table.ts')
    .pipe(ts({
      target: 'es5',
      outFile: 'vehicle-data-table.js',
      "typeRoots": ["./typings", "./node_modules/@types"]
    }))
    .pipe(gulp.dest(paths.compiledTs))
    //.pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('SiteAssets/scripts'));
});

/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/