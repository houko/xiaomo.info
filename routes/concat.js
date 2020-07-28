const router = require('koa-router')();
const concatService = require("../service/concat_service");

router.prefix('/concat');

router.get('/list', async (ctx, next) => {
    ctx.body = await concatService.list();
});

module.exports = router;
