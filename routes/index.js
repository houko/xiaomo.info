const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: "this is xiaomo's home api index page"
    })
});

module.exports = router;
