const router = require('koa-router')();

const createNewsController = require('../controllers/news/create');
const getNewsController = require('../controllers/news/get-news');
const deleteNewsController = require('../controllers/news/delete');

const createBidController = require('../controllers/bids/create');

const createSubscriberCtrl = require('../controllers/subscribers/create');

router.post('/news', createNewsController);
router.delete('/news/:title', deleteNewsController);
router.get('/news/:title', getNewsController);

router.post('/bid', createBidController);

router.post('/subscriber', createSubscriberCtrl);

router.get('/', async ctx => {
    const news = await ctx.newsModel.getRecent(3);
    await ctx.render('main/index', {news});
});

router.get('/news', async ctx => {
    const news = await ctx.newsModel.getRecent(20);
    await ctx.render('main/news', {news});
});

router.get('/admin/news', async ctx => {
    await ctx.render('admin/news');
});

router.get('/404', async ctx => {
    ctx.body = 'not found';
    ctx.status = 404;
});

module.exports = router;