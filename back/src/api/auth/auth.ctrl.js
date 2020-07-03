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
        //console.log(exists);
        if(exists){
            
            ctx.status = 409; //tip: 이미 아이디 존재
            return;

        }

        const user = new User({username});

        await user.setPassword(password);
        await user.save();
        /*
        const data = user.toJSON();
        delete data.hashedPassword;
        
        */
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token,{
            maxAge: 1000 * 60 * 24 * 7,
            httpOnly: true
        })

    }catch (e){
        ctx.throw(500, e)
    }
}


/*
로그인
POST /api/auth/login

*/
exports.login = async ctx => {
    const {username, password} = ctx.request.body;

    if(!username || !password){
        ctx.status = 401;
        return;
    }

    try{
        const user = await User.findByUsername(username);
        if(!user){
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            return;

        }
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token,{
            maxAge: 1000 * 60 * 24 * 7,
            httpOnly: true
        });
    }catch(e){
        ctx.throw(500, e)
    }
}

/*
로그인 확인
GET /api/auth/check

*/
exports.check = async ctx => {
    const {user} = ctx.state;
    if(!user){
        ctx.status = 401;
        return;
    }
    ctx.body = user;
}

/*
로그아웃
POST /api/auth/logout

*/
exports.logout = async ctx => {
    ctx.cookies.set('access_token'); //쿠키제거
    ctx.status = 204;
}