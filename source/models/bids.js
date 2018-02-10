'use strict';

const DbModel = require('./common/dbModel');
const ApplicationError = require('libs/application-error');
const mongoose = require('mongoose');

class Bids extends DbModel {
    constructor() {
        super('bid');
    }

    async create(bid) {
        const isDataValid = bid
            && Object.prototype.hasOwnProperty.call(bid, 'name')
            && Object.prototype.hasOwnProperty.call(bid, 'phone');

        if (isDataValid) {
            await this._insert(bid);
            return bid;
        }
        
        throw new ApplicationError('News data is invalid', 400);
    }

}

module.exports = Bids;