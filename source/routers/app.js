const router = require('koa-router')();

router.get('/', async ctx => {
    const people = ['geddy', 'neil', 'alex'];
    await ctx.render('example', {people: people});
});

module.exports = router;