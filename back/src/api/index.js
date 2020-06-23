const Router = require('koa-router');
const api = new Router();
const posts = require('./posts');
const auth = require('./auth');

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

module.exports = api;
