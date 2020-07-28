const router = require('koa-router')();
const abilityService = require("../service/ability_service");

router.prefix('/ability');

router.get('/list', async (ctx, next) => {
  ctx.body = abilityService.list();
});

module.exports = router;
