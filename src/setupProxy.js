const proxy = require("http-proxy-middleware");

// Allows for CORS on POST calls
module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "http://localhost:8001/",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/', // Remove API from call
            },
        })
    );
    app.listen(3000);
}
