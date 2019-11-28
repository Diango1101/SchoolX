const router = require('koa-router')()
const userService = require('../controllers/p_f_mysql')

router.prefix('/p_factor')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    ctx.body = await userService.findAllUser()
})

router.get('/select', async (ctx, next) => {
    let id = ctx.request.query['id']
    let col = ctx.request.query['col']
    ctx.body = await userService.findformData(id, col)
})

// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['id'])
    arr.push(ctx.request.query['name'])
    arr.push(ctx.request.query['col'])

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

module.exports = router
