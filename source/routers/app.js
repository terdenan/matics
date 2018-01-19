const router = require('koa-router')();

router.get('/', async ctx => {
<<<<<<< Updated upstream
    ctx.body = 'main page';
=======
    await ctx.render('main/index');
});

router.get('/news', async ctx => {
    await ctx.render('main/news');
});

router.get('/single-news', async ctx => {
    await ctx.render('main/single-news');
>>>>>>> Stashed changes
});

module.exports = router;