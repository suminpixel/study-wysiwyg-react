import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';


const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN'
);



export const changeField = createAction(
    CHANGE_FILED,
    ({ form, key, value}) => ({
        form, 
        key,
        value
    })
)

export const initializeForm = createAction(
    INITIALIZE_FORM, form => form
);

export const register = createAction(REGISTER, ({username, password})=>({
    username,
    password
}));

export const login = createAction(LOGIN, ({username, password})=>({
    username,
    password
}));


//사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}
 

//기본값
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm:'',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions({

    //tip: 필드 명 (로그인/회원가입), 필드의 키(이름, 패스워드 등..), 필드의 값을 받아서 한꺼번에 업데이트가능 
    [CHANGE_FILED]: (state, {payload : {form, key, value}}) =>
        produce(state, draft =>{
            draft[form][key] = value;
        }),

    [INITIALIZE_FORM]: (state, {payload : form}) => ({ //인증 초기화
        ...state,
        [form] : initialState[form], //필드의 초기 값 (initial state) 로 변경
        authError: null,

    }),
    [REGISTER_SUCCESS]: (state, {payload : auth}) => ({
        ...state,
        auth, 
        authError: null,

    }),
    [REGISTER_FAILURE]: (state, {payload : error}) => ({
        ...state,

        authError: error,

    }),
    [LOGIN_SUCCESS]: (state, {payload : auth}) => ({
        ...state,
        auth, 
        authError: null,

    }),
    [LOGIN_FAILURE]: (state, {payload : error}) => ({
        ...state,

        authError: error,

    }),
},initialState,
)

export default auth;
