const Router = require('koa-router');
const postsCtrl = require('./posts.crtl');
const posts = new Router();
/*
//dummy data
const printInfo = ctx => {
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        params: ctx.params
    }
}
*/

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write); //tip: id(pk)검증이 필요한 로직은 검증 미들웨어 추가
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjectId,postsCtrl.remove);
posts.patch('/:id',postsCtrl.checkObjectId, postsCtrl.update);


module.exports = posts;


