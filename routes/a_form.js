const router = require('koa-router')()
const userService = require('../controllers/a_formmysql')

router.prefix('/a_form')
function maps(data) {
    let items = []
    data.map(item => {
        items.push({
            id: item.APPLICATION_ID,
            item_name: item.ITEM_NAME,
            reason: item.REASON
        })
    })
    return items
}

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.a_form)
    console.log('aaaa')
    await userService
        .findAllForm()
        .then(data => {
            ctx.body = maps(data)
        })
        .catch(err => {
            console.log(err)
        })
})
router.get('/select', async (ctx, next) => {
    let name = ctx.request.query['id']
    console.log(name)
    ctx.body = await userService
        .findformData(name)
        .then(data => {
            ctx.body = maps(data)
        })
        .catch(err => {
            ctx.body = err
        })
})
// 增加用户(POST请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['id'])
    arr.push(ctx.request.query['item_name'])
    arr.push(ctx.request.query['reason'])
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
