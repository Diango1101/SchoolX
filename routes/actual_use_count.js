const router = require('koa-router')()
const userService = require('../controllers/a_u_count_mysql')

router.prefix('/actual_use_count')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    ctx.body = await userService.findAllData()
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
    arr.push(ctx.request.query['col'])
    arr.push(ctx.request.query['totlenum'])
    arr.push(ctx.request.query['tusenum'])

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
router.get('/UseNumAdd', async (ctx, next) => {
    let id = ctx.query['id']
    let col = ctx.query['col']
    await userService
        .AddUseNum(id, col)
        .then(data => {
            console.log(data)
            if (data.affectedRows > 0) ctx.body = { data: true }
            else ctx.body = { data: false }
        })
        .catch(err => {
            ctx.body = { err }
        })
})
module.exports = router
