let postId = 1;

const posts = [
    {
        id: 1, 
        title: '제목',
        body: '내용...'
    },
    {
        id: 2, 
        title: '제목2',
        body: '내용...'
    }
]

/*
포스트 작성
POST /api/posts
{title, body}
*/
exports.write = ctx =>{
    const {title, body} = ctx.request.body;
    postId += 1;
    const post = {id: postId, title, body};
    posts.push(post);
    ctx.body = post;
};

/*
포스트 목록 조회
POST /api/posts
*/
exports.list = ctx => {
    ctx.body = posts;
}

/*
특정 포스트 조회
POST /api/posts/:id
*/
exports.read = ctx => {
    const {id } = ctx.params;
    
    // id 로 특정 포스트 조회

    const post = posts.find(p => p.id.toString() === id);

    if(!post){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'

        }
        return;
    }
    ctx.body = post;

    //주어진 id값으로 포스트 찾기
}


/*
특정 포스트 제거
DELETE /api/posts/:id
*/

exports.remove = ctx => {
    const {id} = ctx.params;
}