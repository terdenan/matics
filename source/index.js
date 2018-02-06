const path = require('path');
const config = require('config');
const fs = require('fs');
const http = require('http');
const https = require('https');

const Koa = require('koa');
const Subdomain = require('koa-subdomain');
const compress = require('koa-compress');
const serve = require('koa-static');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser')();
const koaBody = require('koa-body');

const app = new Koa();
const subdomain = new Subdomain();
const mainRouter = require('./routers/app');

const NewsModel = require('./models/news');

const mongoose = require('mongoose');

const ApplicationError = require('libs/application-error');

const isProduction = process.env.NODE_ENV === 'production';

mongoose.connect(config.mongo.uri, {useMongoClient: true}, function(err){
    if (err) {
        console.log(err);
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

if (!isProduction) {
    // logger
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.header.host + ctx.url} - ${ms} ms`);
    });
}

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

app.use(bodyParser);
app.use(koaBody({ multipart: true }));
app.use(serve('./public'));
app.use(compress({
    filter: function (content_type) {
    return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

subdomain.use('', mainRouter.routes());
app.use(subdomain.routes());

const listenCallback = function () {
    const {
        port
    } = this.address();

    console.log(`Application started on ${port}`);
};

if (isProduction) {
    const protocolSecrets = {
        key: fs.readFileSync(config.ssl.key),
        cert: fs.readFileSync(config.ssl.cert)
    };

    https
        .createServer(protocolSecrets, app.callback())
        .listen(config.server.port, listenCallback);
} else {
    http
        .createServer(app.callback())
        .listen(config.server.port, listenCallback);
}
