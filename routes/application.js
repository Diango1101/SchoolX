const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig')

router.get('/application', async (ctx, next) => {
    let url = ctx.url
    let item_id = ''
    item_id = ctx.request.query['item_id']
    let query1 = await userService.findApplicationById(item_id)
    ctx.body = {
        url,
        item_id,
        query1
    }
})

/*
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
*/
router.get('/AllApplication', async (ctx, next) => {
    let res = []
    let items = []
    res = await userService.findAllApplication()
    console.log(res)
    res.map(item => {
        items.push({
            ID: item.APPLICATION_ID,
            name: item.ITEM_NAME,
            reason: item.REASON
        })
    })
    ctx.body = items
    console.log('next', next)
})
module.exports = router
