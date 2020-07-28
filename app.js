const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaSwagger = require('koa2-swagger-ui');
const swagger = require('./utils/swagger');

const users = require('./routes/users');
const ability = require('./routes/ability');
const selfIntroduce = require('./routes/self_introduce');
const works = require('./routes/works');
const concat = require('./routes/concat');

// error handler
onerror(app);

// middle wares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));



// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(swagger.routes(), swagger.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(ability.routes()).use(ability.allowedMethods());
app.use(concat.routes()).use(concat.allowedMethods());
app.use(selfIntroduce.routes()).use(selfIntroduce.allowedMethods());
app.use(works.routes()).use(works.allowedMethods());

app.use(
    koaSwagger({
        routePrefix: '/', //
        swaggerOptions: {
            url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
        },// host at /swagger instead of default /docs
    }),
);


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
