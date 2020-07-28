const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaSwagger = require('koa2-swagger-ui');
const swagger = require('./utils/swagger');
const cors = require('koa2-cors');

const users = require('./conrollers/users');
const ability = require('./conrollers/ability');
const selfIntroduce = require('./conrollers/self_introduce');
const works = require('./conrollers/works');
const concat = require('./conrollers/concat');

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

// cors
app.use(cors());

// routes
app.use(swagger.routes(), swagger.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(ability.routes()).use(ability.allowedMethods());
app.use(concat.routes()).use(concat.allowedMethods());
app.use(selfIntroduce.routes()).use(selfIntroduce.allowedMethods());
app.use(works.routes()).use(works.allowedMethods());

app.use(koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
        url: '/swagger.json', // example path to json
    },
}));
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
