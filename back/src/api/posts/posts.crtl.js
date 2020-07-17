
const Post = require('../../models/post');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const {ObjectId} = mongoose.Types;



// pk(id) 값이 올바른지 검증하는 기능 (미들웨어)
exports.checkObjectId = (ctx, next) => {
    const {id} = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400; 
        return;
    }
    return next();
}
/*
포스트 작성
POST /api/posts
{title, body}
*/
exports.write = async ctx => {
    /*
    //dummy
    const {title, body} = ctx.request.body;
    postId += 1;
    const post = {id: postId, title, body};
    posts.push(post);
    ctx.body = post;
    */

    //tip: joi 라이브러리로 요청 내용 검증
    const schema = Joi.object().keys({

        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array()
        .items(Joi.string())
        .required()

    });

    const result = schema.validate(ctx.request.body);

    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, tags} = ctx.request.body;
    
    const post = new Post({
        title,
        body,
        tags,
    });
    try{
        await post.save();
        ctx.body = post;

    } catch(e){
        ctx.throw(500, e)
    }
};

/*
포스트 목록 조회
POST /api/posts
*/
exports.list = async ctx => {

    const {id } = ctx.params
    
    try{
        const posts = await Post.find().exec();
        ctx.body = posts;
    }catch(e){
        ctx.throw(500, e)
    }

}

/*
특정 포스트 조회
POST /api/posts/:id
*/
exports.read = async ctx => {

    const { id } = ctx.params
    
    try{
        const post = await Post.findById(id).exec();

        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    }catch(e){
        ctx.throw(500, e)
    }

}


/*
특정 포스트 제거
DELETE /api/posts/:id
*/

exports.remove = async ctx => {

    const {id } = ctx.params
    
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
  
    }catch(e){
        ctx.throw(500, e)
    }

}

/*
특정 포스트 수정
PATCH /api/posts/:id
*/

exports.update = async ctx => {

    const {id } = ctx.params
    
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        }).exec();

        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
        
  
    }catch(e){
        ctx.throw(500, e)
    }

}