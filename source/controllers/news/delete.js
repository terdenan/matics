'use strict';

module.exports = async (ctx) =>  {
    const title = ctx.params.title;
    await ctx.newsModel.remove(title);
    ctx.status = 200;
};