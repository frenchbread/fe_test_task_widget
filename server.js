const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')

const PORT = 3355

app.use(serve('./public'))

app.listen(PORT)

console.log(`server is listening on port ${PORT}`)
