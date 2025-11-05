let queryBuilder =  require('node-querybuilder');
const settings = {
    host: 'localhost',
    database: 'asset_manager',
    user: 'root',
    password: ''
};
const pool = new queryBuilder(settings, 'mysql', 'pool');

module.exports = pool;