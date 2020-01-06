const router = require('koa-router')()
const userService = require('../controllers/p_f_mysql')

router.prefix('/p_factor')
function maps(data) {
    let items = []
    data.map(item => {
        items.push({
            id: item.MECH_ID,
            name: item.MECH_NAME,
            col: item.APPLICATION_COL,
            money: item.MONEY
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
    arr.push(ctx.request.query['name'])
    arr.push(ctx.request.query['col'])

    await userService
        .addformData(arr)
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
