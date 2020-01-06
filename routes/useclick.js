const router = require('koa-router')()
const userService = require('../controllers/useclick')

router.prefix('/useclick')

function maps(data) {
    let items = []
    data.map(item => {
        items.push({
            lab: item.ROOM_OF_LAB,
            use_time: item.USE_TIME,
            lab_user: item.LAB_USER
        })
    })
    return items
}

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    let id = ctx.request.query['id']
    var reanum = ''
    var plannum = ''
    // console.log(ctx.session.username)
    await userService.findDataFromPlan(id).then(data => {
        plannum = data[0].USE_NUM
    })
    await userService.findDataFromReal(id).then(data => {
        reanum = data[0].USENUM
    })
    let num = (reanum / plannum) * 100
    num = num + '%'
    ctx.body = { plannum, reanum, num }
})
module.exports = router
