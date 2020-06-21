import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import user, { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const LoginForm = (  ) => {

    const dispatch = useDispatch();

    const {form} = useSelector(({ auth })=>({
        form: auth.login,

    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
      
    }

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        
    };


 
    return(
        <AuthForm 
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )

}

export default LoginForm;