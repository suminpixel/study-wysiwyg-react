import {createAction, handleActions, createActions} from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISER, REGISER_SUCCESS, REGISER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN'
);

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

const registerSaga = createRequestSaga(REGISER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

//사가 생성
export function* authSaga(){
    yield takeLatest(REGISER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}
 
const auth = handleActions({
    [CHANGE_FILED]: (state, {payload : {form, key, value}}) =>
        produce(state, draft =>{
            draftp[form][key] = value;
        }),
    [INITIALIZE_FORM]: (state, {payload : form}) => ({ //인증 초기화
        ...state,
        [form] : initialState[form],
        authError: null,

    }),
    [REGISER_SUCCESS]: (state, {payload : auth}) => ({
        ...state,
        auth, 
        authError: null,

    }),
    [REGISER_FAILURE]: (state, {payload : error}) => ({
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
