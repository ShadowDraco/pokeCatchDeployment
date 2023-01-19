const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/user",
    createProxyMiddleware({
      target: "https://localhost:8000",
      changeOrigin: true,
    })
  )
}
