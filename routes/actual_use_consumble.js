const router = require('koa-router')()
const userService = require('../controllers/a_u_c_mysql')
const moment = require('moment')
router.prefix('/actual_use_consumble')

function maps(data) {
    let items = []
    data.map(item => {
        items.push({
            id: item.ID,
            date_of_borrow: item.DATE_OF_BORROW,
            name: item.NAME,
            factory: item.FACTORY,
            warehouse: item.WAREHOUSE,
            item_user: item.ITEM_USER
        })
    })
    return items
}
//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    // console.log(ctx.session.username)
    let res = await userService.findallDate()
    res.map(item => {
        item.DATE_OF_BORROW = moment(item.DATE_OF_BORROW).format('YYYY-MM-DD')
    })
    ctx.body = maps(res)
})
router.get('/select', async (ctx, next) => {
    let id = ctx.request.query['id']
    let res = await userService.findformData(id)
    res.map(item => {
        item.DATE_OF_BORROW = moment(item.DATE_OF_BORROW).format('YYYY-MM-DD')
    })
    ctx.body = maps(res)
})
// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['id'])
    arr.push(ctx.request.query['date_of_borrow'])
    arr.push(ctx.request.query['name'])
    arr.push(ctx.request.query['factory'])
    arr.push(ctx.request.query['warehouse'])
    arr.push(ctx.request.query['item_user'])

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
