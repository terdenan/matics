const router = require('koa-router')();

router.get('/', async ctx => {
    ctx.body = 'main page';
});

module.exports = router;