const router = require('koa-router')()
const userService = require('../controllers/a_formmysql')

router.prefix('/a_form')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.a_form)
    console.log('aaaa')
    ctx.body = await userService
        .findAllForm()
        .then(console.log('success'))
        .catch(err => {
            console.log(err)
        })
})
router.get('/select', async (ctx, next) => {
    let name = ctx.request.query['id']
    console.log(name)
    ctx.body = await userService
        .findformData(name)
        .then()
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
