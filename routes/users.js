const router = require('koa-router')()
const userService = require('../controllers/users_mysql');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await userService.findAllUser();
})

// 增加用户(get请求)
router.get('/add', async (ctx, next) => {
  let arr = [];

arr.push(ctx.request.query['user']);
 console.log(ctx.request.query['name'])


arr.push(ctx.request.query['pass']);
arr.push(ctx.request.query['auth']);
console.log(arr)
await userService.addUserData(arr)
      .then((data) => {
        let r = '';
        if (data.affectedRows != 0) {
          r = 'ok';
        }
      ctx.body = {
        data: r
      }
    })
      .catch((err) => {
        ctx.body = {
         data: err
        }
      })
})

module.exports = router
