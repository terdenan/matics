'use strict';

const fs = require('fs');
const path = require('path');

async function uploadFuckingFileAndReturnFuckingPath(file) {
    const filePath = path.join('public', 'uploads', Date.now() + '-' + file.name);
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(filePath);
    reader.pipe(stream);

    return filePath;
}

module.exports = async (ctx) => {
    const news = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
    
    news['photoUrl'] = await uploadFuckingFileAndReturnFuckingPath(file);

    const newNews = await ctx.newsModel.create(news);

    ctx.status = 200;
    ctx.body = newNews;
};