'use strict';

const Model = require('./model');

class DbModel extends Model {
    constructor(dbModelName) {
        super();
        const MongooseModel = require(`../db/${dbModelName}`);
        this._MongooseModel = MongooseModel;
    }

    async getAll(id) {
        const data = await this._MongooseModel
            .find({userId: id})
            .lean()
            .exec();
        return data;
    }

    async get(id) {
        const data = await this._MongooseModel
            .findOne({id})
            .lean()
            .exec();
        return data;
    }

    async getBy(cond) {
        const data = await this._MongooseModel
            .findOne(cond)
            .lean()
            .exec();
        return data;
    }

    async getMany(cond) {
        const data = await this._MongooseModel
            .find(cond)
            .lean()
            .exec();
        return data;
    }

    async getRecent(count, cond) {
        const data = await this._MongooseModel
            .find(cond)
            .lean()
            .sort({'date': -1})
            .limit(count)
            .exec();
        return data;
    }

    async _insert(item) {
        await this._MongooseModel
            .create(item);
    }

    async _remove(_id) {
        await this._MongooseModel
            .remove({_id});
    }

    async _update(cond, set) {
        await this._MongooseModel
            .update(cond, {$set: set});
    }
}

module.exports = DbModel;