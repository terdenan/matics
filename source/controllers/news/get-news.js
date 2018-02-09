'use strict';

module.exports = async (ctx) =>  {
    const title = ctx.params.title;
    const news = await ctx.newsModel.getBy({cyrillicTitle: title});
    const newsList = await ctx.newsModel.getRecent(3, { cyrillicTitle: { $ne: title } });
    console.log(newsList);
    if (news) {
        await ctx.render('main/single-news', {news, newsList});
    } else {
        ctx.redirect('/404');
    }
};