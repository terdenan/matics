'use strict';

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const util = require('util');
const moment = require('moment');

async function uploadFuckingFileAndReturnFuckingPath(file) {
    const filePath = path.join('uploads', Date.now() + '-' + file.name);
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join('public', filePath));
    reader.pipe(stream);

    return filePath;
}

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function editSitemap(pathToSitemap, news) {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();

    const sitemap = await readFile(pathToSitemap, 'utf-8');
    const newRecord = {
        loc: 'https://matics.kz/news/' + news.cyrillicTitle,
        lastmod: moment().format(),
        changefreq: 'monthly',
        priority: '0.70'
    };

    parser.parseString(sitemap, async (err, result) => {
        result.urlset.url.push(newRecord);
        const newSitemap = builder.buildObject(result);
        await writeFile(pathToSitemap, newSitemap);
    });
}

module.exports = async (ctx) => {
    const news = ctx.request.body.fields;
    const file = ctx.request.body.files.file;
    
    news['photoUrl'] = await uploadFuckingFileAndReturnFuckingPath(file);
    const newNews = await ctx.newsModel.create(news);

    const pathToSitemap = path.join('public', 'sitemap.xml');
    await editSitemap(pathToSitemap, news);

    ctx.status = 200;
    ctx.body = newNews;
};