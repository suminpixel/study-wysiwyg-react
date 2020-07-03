import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = (   ) => {

    const dispatch = useDispatch(); 
    const [error, setError] = useState(null);

    const {form, auth, authError, user} = useSelector(({ auth , user})=>({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        )
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        console.log('onSubmit');

        //빈칸 발리데이션
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        //패스워드 확인 발리데이션
        if(passwordConfirm!== password){
            setError('비밀번호가 일치하지 않습니다');
            dispatch(changeField({form:'register', key:'password', value:''}));
            dispatch(changeField({form:'register', key:'passwordConfirm', value:''}))
            return;
        }
        const { username, password, passwordConfirm } = form;
        if(password !== passwordConfirm){
            //TODO : 오류처리
            alert(5);
            return;
            
        }
        
        dispatch(register({username, password}));
        
    };


    //컴포넌트가 처음 렌더링 될 때 form을 초기화
    useEffect(()=>{
        
        dispatch(initializeForm('register'));
    },[dispatch])

    //회원가입 성공-실패 처리
    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError)

            if(authError.response.status === 400){
                setError('이미 존재하는 계정입니다');
                return;
            }else{
                setError('회원가입 실패');
                return;
            }

        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth)
            dispatch(check());
        }
    },[auth, authError, dispatch])

    //user 값이 잘 설정되었는지 확인
    useEffect(()=>{
        if(user){
            console.log('check API 성공');
            console.log(user);
        }

    },[user])

    return(
        <AuthForm 
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )

}

export default RegisterForm;