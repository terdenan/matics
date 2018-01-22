'use strict';

module.exports = async (ctx) => {
    const news = ctx.request.body;
    const newNews = await ctx.newsModel.create(news);
    ctx.status = 200;
    ctx.body = newNews;
};