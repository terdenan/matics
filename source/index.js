const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const serve = require('koa-static');
const config = require('config');

const app = new Koa();
const subdomain = new Subdomain();
const mainRouter = require('./routers/app');

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.header.host + ctx.url} - ${ms} ms`);
});

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = {
            message: err.message
        };
    }
});

app.use(serve('./public'));

subdomain.use('', mainRouter.routes());
app.use(subdomain.routes());

app.listen(config.server.port, () => {
    console.log(`Matics listening on port ${config.server.port}`);
});