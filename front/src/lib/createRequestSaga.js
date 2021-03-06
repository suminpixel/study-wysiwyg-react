import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

//tip: SUCCESS, FAILURE action 선언 템플릿 제작

export const createRequestActionTypes = type => {

    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    
    return [type, SUCCESS, FAILURE];

};

export default function createRequestSaga(type, request){

    const SUCCESS =  `${type}_SUCCESS`;
    const FAILURE =  `${type}_FAILURE`;  
  
    return function*(action){
        console.log(`function* `);
        console.log(action);

        yield put(startLoading(type)); //로딩 시작

        try{

            //1. 회원가입 post 요청
            const response = yield call(request, action.payload) //post 요청
            
            //2 .리턴값 res 가 undefined
           // yield console.log(res)

            //yield console.log(`yield call ${request}`)
            //yield console.log(action.payload)
   
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        }catch(e){
            yield console.log(e)
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); //로딩 끝
    }
}