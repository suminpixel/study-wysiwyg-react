import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import user, { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const LoginForm = ( {history} ) => {

    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const {form, auth, authError, user} = useSelector(({ auth, user })=>({
        form: auth.login,
        auth: auth.auth,
        user: user.user,

    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        console.log(name)
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();

        const {username, password} = form;
        dispatch(login({username, password}));
        
    };

    //컴포넌트가 처음 렌더링 될 때 form을 초기화
    useEffect(()=>{
        
        dispatch(initializeForm('login'));
    },[dispatch])

    //회원가입 성공-실패 처리
    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            setError(authError);

        }
        if(auth){
            console.log('로그인 성공');
            console.log(auth)
            dispatch(check());
        }
    },[auth, authError, dispatch])

    //로그인한 상태일 경우 메인페이지로
    useEffect(()=>{
        if(user){
            history.push('/');
        }
    },[user])


 
    return(
        <AuthForm 
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )

}

export default withRouter(LoginForm);