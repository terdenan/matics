'use strict';

const DbModel = require('./common/dbModel');
const ApplicationError = require('libs/application-error');
const mongoose = require('mongoose');

class Subscribers extends DbModel {
    constructor() {
        super('subscriber');
    }

    async create(subscriber) {
        const isDataValid = subscriber
            && Object.prototype.hasOwnProperty.call(subscriber, 'email');

        if (isDataValid) {
            await this._insert(subscriber);
            return subscriber;
        }
        
        throw new ApplicationError('News data is invalid', 400);
    }

}

module.exports = Subscribers;