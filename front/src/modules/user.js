import {createAction, handleActions, createActions} from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import {takeLatest} from 'redux-saga/effects';


const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK'
);


//기본값
const initialState = {
    user: null,
    checkError: null
};
export const tempSetUser = createAction(TEMP_SET_USER, user=>user);
export const check = createAction(CHECK)
const checkSaga = createRequestSaga(CHECK);


export function* userSaga(){
    yield takeLatest(CHECK, checkSaga)
}


const user = handleActions({
    [TEMP_SET_USER]: (state, {payload : user}) => {

    },
    [CHECK_SUCCESS]: (state, {payload : user}) => ({ //인증 초기화
        ...state,
        user,
        checkError: null,

    }),
    [CHECK_FAILURE]: (state, {payload : user}) => ({ //인증 초기화
        ...state,
        user,
        checkError: null,

    }),

   
},initialState,
)

export default user;
