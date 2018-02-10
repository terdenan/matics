'use strict';

module.exports = async (ctx) => {
    const bid = ctx.request.body.fields;

    const newBid = await ctx.bidsModel.create(bid);

    const message = `Заказ на обратный звонок\nИмя: ${bid.name}\nТелефон: ${bid.phone}`;

    if (ctx.isProduction) {
        ctx.telegramBot.sendMessage(298493325, message);
        ctx.telegramBot.sendMessage(66075583, message);
        ctx.telegramBot.sendMessage(288260717, message);
    }

    ctx.status = 200;
    ctx.body = bid;
};