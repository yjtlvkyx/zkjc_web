const gulp = require("gulp"),
    server = require("gulp-webserver");

//启动服务
gulp.task("server", () => {
    return gulp.src("src").pipe(server({
        port: 8844,
        proxies: [
            { source: "/seldatas", target: "http://localhost:8024/seldatas" }
        ]
    }))
})