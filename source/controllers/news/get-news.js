'use strict';

module.exports = async (ctx) =>  {
    const title = ctx.params.title;
    const news = await ctx.newsModel.getBy({title: title});
    ctx.status = 200;
    ctx.body = news;
};