//const Post = require('../../models/post');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const User = require('../../models/user');

/*
회원가입
POST /api/auth/register
{
    username: 'velopert',
    password: 'mypass123',
}
*/
exports.register = async ctx => {
    // tip : step1 request body 검증 -> step2 response 검증
    
    //step 1) request body 검증
    const schema = Joi.object().keys({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
        password: Joi.string().required(),


    })

    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    //step 2) 데이터 처리
    const {username, password } = ctx.request.body;

    try{
        const exists = await User.findByUsername(username);
        if(exists){
            ctx.status = 409; //tip: 이미 아이디 존재
            return;

        }

        const user = new User({username});

        await user.setPassword(password);
        
    }catch (e){

    }
}