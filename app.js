const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cor = require('koa-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const aform = require('./routes/a_form')
const actual_use_consumble = require('./routes/actual_use_consumble')
const actual_use_count = require('./routes/actual_use_count')
const f_process = require('./routes/f_process')
const l_course = require('./routes/l_course')
const p_factor = require('./routes/p_factor')
const plan_consumble = require('./routes/plan_consumble')
const useclick = require('./routes/useclick')

// error handler
onerror(app)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)
app.use(json())
app.use(logger())
app.use(cor())

app.use(require('koa-static')(__dirname + '/public'))

app.use(
    views(__dirname + '/views', {
        extension: 'pug'
    })
)

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(aform.routes(), aform.allowedMethods())
app.use(actual_use_consumble.routes(), actual_use_consumble.allowedMethods())
app.use(actual_use_count.routes(), actual_use_count.allowedMethods())
app.use(f_process.routes(), f_process.allowedMethods())
app.use(l_course.routes(), l_course.allowedMethods())
app.use(p_factor.routes(), p_factor.allowedMethods())
app.use(plan_consumble.routes(), plan_consumble.allowedMethods())
app.use(useclick.routes(), useclick.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
