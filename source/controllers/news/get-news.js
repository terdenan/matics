'use strict';

module.exports = async (ctx) =>  {
    const title = ctx.params.title;
    const news = await ctx.newsModel.getBy({title: title});
    if (news) {
        await ctx.render('main/single-news', {news});
    } else {
        ctx.redirect('/404');
    }
};