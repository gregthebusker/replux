var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('default', ['webpack']);

gulp.task('lint', () => {
    return gulp.src([`.//**/*.js`])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', () => {
    gulp.watch([`./**`], ['lint']);
});
