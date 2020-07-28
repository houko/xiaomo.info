const router = require('koa-router')();
const selfIntroduceService = require("../service/self_introduce_service");


router.prefix('/selfIntroduce');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'this is selfIntroduce router !'
    })
});

router.get('/list', async (ctx, next) => {
    ctx.body = await selfIntroduceService.list();
});

module.exports = router;
