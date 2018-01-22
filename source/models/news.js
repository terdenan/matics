'use strict';

const DbModel = require('./common/dbModel');
const ApplicationError = require('libs/application-error');

class News extends DbModel {
    constructor() {
        super('news');
    }

    async create(news) {
        console.log(news);
        const isDataValid = news
            && Object.prototype.hasOwnProperty.call(news, 'title')
            && Object.prototype.hasOwnProperty.call(news, 'cyrillicTitle')
            && Object.prototype.hasOwnProperty.call(news, 'description')
            && Object.prototype.hasOwnProperty.call(news, 'body')
            && Object.prototype.hasOwnProperty.call(news, 'photoUrl');

        if (isDataValid) {
            await this._insert(news);
            return news;
        }
        
        throw new ApplicationError('News data is invalid', 400);
    }

    async remove(id) {
        const card = await this.get(id);
        if (!card) {
            throw new ApplicationError(`Card with ID=${id} not found`, 404);
        }
        await this._remove(id);
    }

}

module.exports = News;