const router = require('koa-router')();
const userService = require('../controllers/mysqlConfig');

router.prefix('/users');

router.get('/', async function (ctx, next) {
  ctx.body = await userService.findAllUser();
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
