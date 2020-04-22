var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var sassPaths = [
  "bower_components/foundation-sites/scss",
  "bower_components/motion-ui/src"
];

cobrand.forEach(brand => {
  console.log("scss/" + brand + ".scss");
  gulp.task("sass", function() {
    // only need to change cobrand here
    return gulp
      .src(["scss/*.scss"])
      .pipe(
        $.sass({
          includePaths: sassPaths,
          outputStyle: "compressed" // if css compressed **file size**
        }).on("error", $.sass.logError)
      )
      .pipe(
        $.autoprefixer({
          browsers: ["last 2 versions", "ie >= 9"]
        })
      )
      .pipe(gulp.dest("css"));
  });
});

gulp.task("default", ["sass"], function() {
  gulp.watch(["scss/**/*.scss"], ["sass"]);
});
