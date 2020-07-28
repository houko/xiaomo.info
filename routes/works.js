const router = require('koa-router')();
const worksService = require("../service/works_service");

router.prefix('/works');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'this is works api router!'
  })
});

router.get('/list', async (ctx, next) => {
  ctx.body = worksService.list();
});

module.exports = router;
