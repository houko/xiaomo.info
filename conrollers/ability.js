const router = require('koa-router')();
const abilityService = require("../service/ability_service");

router.prefix('/ability');

router.get('/list', async (ctx, next) => {
    ctx.body = await abilityService.list();
});

module.exports = router;
