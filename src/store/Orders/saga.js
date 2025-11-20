import { call, put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_ORDERS_REQUEST,
} from './actionTypes'

import {
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from './actions'

import axiosInstance from 'pages/Utility/axiosInstance'

const fetchOrdersApi = async ({role,params}) => {
  if(role?.name?.toLowerCase()=="vendor"){
    return await axiosInstance.get(`V1/orders/${role?.id}`, { params })
  }else{
    return await axiosInstance.get('V1/orders', { params })
  }
}

// Fetch Orders saga
function* fetchOrdersSaga(action) {
  try {
    const response = yield call(fetchOrdersApi, action.payload)
    yield put(fetchOrdersSuccess(response.data))
  } catch (error) {
    yield put(fetchOrdersFailure(error.message))
  }
}

// Add this to the watcher saga
export default function* userSaga() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga) 
}
