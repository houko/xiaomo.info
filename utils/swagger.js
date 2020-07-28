const router = require('koa-router')(); //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'API',
        version: '1.0.0',
        description: 'API',
    },
    host: 'localhost:3000',
    basePath: '/' // Base path (optional)
};

const options = {
    swaggerDefinition,
    apis: ['./controllers/*.js'], // 写有注解的router的存放地址
};

const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
});

module.exports = router;
//将页面暴露出去