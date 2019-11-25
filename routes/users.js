const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig')

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    ctx.body = await userService.findAllUser()
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.body['name'])
    arr.push(ctx.request.body['pass'])
    arr.push(ctx.request.body['auth'])

    await userService
        .addUserData(arr)
        .then(data => {
            let r = ''
            if (data.affectedRows != 0) {
                r = 'ok'
            }
            ctx.body = {
                data: r
            }
        })
        .catch(() => {
            ctx.body = {
                data: 'err'
            }
        })
})

router.get('/AllApplication', async (ctx, next) => {
    let id = ctx.query['id']
    let col = ctx.query['col']
    await userService.Is_check(id, col).then(data => {
        ctx.body = { data: true }
    })
})
module.exports = router
router.get('/UseNumAdd', async (ctx, next) => {
    let id = ctx.query['id']
    let col = ctx.query['col']
    await userService
        .AddUseNum(id, col)
        .then(() => {
            ctx.body = { data: true }
        })
        .catch(err => {
            ctx.body = { err: err }
        })
})
