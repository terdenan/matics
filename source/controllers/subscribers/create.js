'use strict';

module.exports = async (ctx) => {
    const subscriber = ctx.request.body.fields;

    const newSubscriber = await ctx.subscriberModel.create(subscriber);

    const message = `Подписка на новости\nПочта: ${subscriber.email}`;

    if (ctx.isProduction) {
        ctx.telegramBot.sendMessage(298493325, message);
        ctx.telegramBot.sendMessage(66075583, message);
        ctx.telegramBot.sendMessage(288260717, message);
    }

    ctx.status = 200;
    ctx.body = subscriber;
};