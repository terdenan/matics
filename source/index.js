const path = require('path');
const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const serve = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser')();
const config = require('config');

const app = new Koa();
const subdomain = new Subdomain();
const mainRouter = require('./routers/app');

const NewsModel = require('./models/news');

const mongoose = require('mongoose');

const ApplicationError = require('libs/application-error');

mongoose.connect(config.mongo.uri, {useMongoClient: true}, function(err){
    if (err) {
        throw new ApplicationError('Connection to MongoDB is lost');
    }
});
mongoose.Promise = global.Promise;

render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'ejs',
  layout: false,
  cache: false
});

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
        ctx.status = err instanceof ApplicationError ? err.status : 500;
        ctx.body = {
            message: err.message
        };
    }
});

app.use(async (ctx, next) => {
    ctx.newsModel = new NewsModel();

    await next();
});

console.log(config.mongo.uri)


app.use(bodyParser);
app.use(serve('./public'));

subdomain.use('', mainRouter.routes());
app.use(subdomain.routes());

app.listen(config.server.port, () => {
    console.log(`Matics listening on port ${config.server.port}`);
});