import { all, fork } from 'redux-saga/effects'
import { servicesSaga } from './services/servicesSaga'

export default function* rootSaga() {
  yield all([fork(servicesSaga)])
}