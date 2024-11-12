"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
// const imagemin = require('gulp-imagemin');
// const htmlmin = require('gulp-htmlmin');

const dist = "./dist/";

// gulp.task("copy-html", () => {
//     return gulp.src("./src/index.html")
//                 .pipe(gulp.dest(dist))
//                 .pipe(browsersync.stream());
// });

gulp.task("build-js", () => {
    return gulp.src("./src/js/script.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + "/js/"))
                .on("end", browsersync.reload);
});

// gulp.task("copy-assets", () => {
//     return gulp.src("./src/assets/**/*.*")
//                 .pipe(gulp.dest(dist + "/assets"))
//                 .on("end", browsersync.reload);
// });

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    // gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("src/*.html").on('change', browsersync.reload);
    // gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/script.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + "/js/"));
});

// gulp.task("default", gulp.parallel("watch", "build"));

gulp.task('styles', function() {
  return gulp.src("src/sass/**/*.+(scss|sass)")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("dist/css"))
      .pipe(browsersync.stream());
});

gulp.task('watch1', function() {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
  gulp.watch("src/*.html").on('change', gulp.parallel('html'));
  // gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
  // gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
  gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
  gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
  return gulp.src("src/*.html")
      // .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("dist/"));
});

// gulp.task('scripts', function () {
//   return gulp.src("src/js/**/*.js")
//       .pipe(gulp.dest("dist/js"))
//       .pipe(browserSync.stream());
// });

gulp.task('icons', function () {
  return gulp.src("src/icons/**/*")
      .pipe(gulp.dest("dist/icons"))
      .pipe(browsersync.stream());
});

gulp.task('images', function () {
  return gulp.src("src/img/**/*")
      // .pipe(imagemin())
      .pipe(gulp.dest("dist/img"))
      .pipe(browsersync.stream());
});
gulp.task('fonts', function () {
  return gulp.src("src/fonts/*")
      // .pipe(imagemin())
      .pipe(gulp.dest("dist/fonts"))
      .pipe(browsersync.stream());
});

gulp.task('default', gulp.parallel('watch', "build", "watch1", "html", 'styles', 'icons', 'images', 'fonts'));