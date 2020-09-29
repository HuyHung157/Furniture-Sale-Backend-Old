import dbConfig from './db.config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    dbConfig.DB || 'postgres',
    dbConfig.USER || 'postgres',
    dbConfig.PASSWORD || '123',
    {
        host: dbConfig.HOST || 'localhost',
        dialect: dbConfig.dialect || 'postgres',
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.require,
            idle: dbConfig.pool.idle
        }
    }
);
const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
}