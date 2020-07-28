const router = require('koa-router')();
const concatService = require("../service/concat_service");

router.prefix('/concat');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'this is concat api!'
    })
});

router.get('/list', async (ctx, next) => {
    ctx.body = concatService.list();
});

module.exports = router;
