const router = require('koa-router')()
const userService = require('../controllers/p_c_mysql')

router.prefix('/plan_consumble')

function maps(data) {
    let items = []
    data.map(item => {
        console.log(item)
        items.push({
            id: item.MECH_ID,
            col: item.APPLICATION_COL,
            use_num: item.USE_NUM,
            check: item.IS_CHECK
        })
    })
    return items
}

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    await userService.findAllData().then(data => {
        console.log(data)
        ctx.body = maps(data)
    })
})

router.get('/select', async (ctx, next) => {
    let id = ctx.request.query['id']
    let col = ctx.request.query['col']
    await userService.findformData(id, col).then(data => {
        ctx.body = maps(data)
    })
})

// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['id'])
    arr.push(ctx.request.query['col'])
    arr.push(ctx.request.query['use_num'])
    arr.push(ctx.request.query['check'])

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

router.get('/ischeck', async (ctx, next) => {
    let id = ctx.request.query['id']
    let col = ctx.request.query['col']
    await userService
        .Is_check(id, col)
        .then(() => {
            ctx.body = { data: true }
        })
        .catch(err => {
            ctx.body = { err }
        })
})

module.exports = router
