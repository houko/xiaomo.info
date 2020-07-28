const router = require('koa-router')();
const worksService = require("../service/works_service");

router.prefix('/works');

router.get('/list', async (ctx, next) => {
    ctx.body = await worksService.list();
});

module.exports = router;
