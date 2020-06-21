require('dotenv').config();
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');


const {PORT, MONGO_URI} = process.env;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true , useFindAndModify:false
    })
    .then(()=>{
        console.log('Connected to MogoDB');
    })
    .catch((e)=>{
        console.log(e);
    })

const api = require('./src/api');
const app = new koa();
const router = new Router();

//라우터 설정
/*
router.get('/', ctx => {
    ctx.body = '홈';
});

router.get('/about/:name?', ctx => {
    const {name} = ctx.params;
    
    ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/posts', ctx => {
    const {id} = ctx.query; //tip: params - pk, id / query - name, option

    ctx.body = id ? `포스트 #${id}` : '포스트 아이디 없음';
});
*/
app.use(bodyParser());

router.use('/api', api.routes());
router.get('/', ctx => {
    ctx.body = '홈';
});
//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})
