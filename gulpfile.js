var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var webpack = require('webpack');

gulp.task('default', ['webpack']);

gulp.task('lint', () => {
    gulp.start('sprite-lint');
    return gulp.src([`.//**/*.js`])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', () => {
    gulp.watch([`./**`], ['lint']);
});

gulp.task('watch-webpack', () => {
    gulp.watch([`./**`], ['webpack']);
});

gulp.task('webpack-dev', (callback) => {
    var spawn = require('child_process').spawn;
    var wp = spawn('webpack-dev-server', ['--config', 'webpack.hot.config.js', '--hot']);

    wp.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    wp.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    wp.on('error', (error) => {
        console.log(error);
    });
});

gulp.task('webpack', (callback) => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});
