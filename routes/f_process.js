const router = require('koa-router')()
const userService = require('../controllers/f_process_mysql')

router.prefix('/f_process')

function maps(data) {
    let items = []
    data.map(item => {
        items.push({
            id: item.MECH_ID,
            col: item.APPLICATION_COL,
            status: item.STATUS
        })
    })
    return items
}

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    await userService.findAllform().then(data => {
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

router.get('/selectByStatus', async (ctx, next) => {
    let status = ctx.request.query['status']
    await userService.findByStatus(status).then(data => {
        ctx.body = maps(data)
    })
})

// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['id'])
    arr.push(ctx.request.query['col'])
    arr.push(ctx.request.query['status'])
    console.log(arr)
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
