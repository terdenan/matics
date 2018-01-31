const router = require('koa-router')();

const createNewsController = require('../controllers/news/create');
const getNewsController = require('../controllers/news/get-news');
const deleteNewsController = require('../controllers/news/delete');

router.post('/news', createNewsController);
router.delete('/news/:title', deleteNewsController);
router.get('/news/:title', getNewsController);

router.get('/', async ctx => {
    ctx.body = 'main page';
    await ctx.render('main/index');
});

router.get('/news', async ctx => {
    await ctx.render('main/news');
});

router.get('/single-news', async ctx => {
    await ctx.render('main/single-news');
});


router.get('/admin/news', async ctx => {
    await ctx.render('admin/news');
});

module.exports = router;