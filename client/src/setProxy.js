const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "https://poke-catch.herokuapp.com/",
      changeOrigin: true,
    })
  )
}
