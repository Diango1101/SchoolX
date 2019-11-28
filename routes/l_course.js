const router = require('koa-router')()
const userService = require('../controllers/l_c_mysql')

router.prefix('/l_course')

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
    // console.log(ctx.session.username)
    await userService.findAllData().then(data => {
        console.log(data)
        ctx.body = maps(data)
    })
})

router.get('/select', async (ctx, next) => {
    let lab = ctx.request.query['lab']
    await userService.findformData(lab).then(data => {
        ctx.body = maps(data)
    })
})

router.get('/delete', async (ctx, next) => {
    let lab = ctx.request.query['lab']
    await userService.DeleteformData(lab).then(data => {
        let r = ''
        if (data.affectedRows != 0) {
            r = 'ok'
        }
        ctx.body = {
            data: r
        }.catch(() => {
            ctx.body = {
                data: 'err'
            }
        })
    })
})

// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
    let arr = []

    arr.push(ctx.request.query['lab'])
    arr.push(ctx.request.query['use_time'])
    arr.push(ctx.request.query['lab_user'])

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
