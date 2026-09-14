import { all, call, put, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import { servicesAPI, type ServiceDetails, type ServiceListItem } from '../../api/servicesAPI'
import {
  detailsFailed,
  detailsRequested,
  detailsSucceeded,
  listFailed,
  listRequested,
  listSucceeded,
} from './servicesSlice'

function* fetchListWorker() {
  try {
    const data: ServiceListItem[] = yield call(servicesAPI.fetchList)
    yield put(listSucceeded(data))
  } catch (error) {
    yield put(listFailed(error instanceof Error ? error.message : 'Неизвестная ошибка'))
  }
}

function* fetchDetailsWorker(action: PayloadAction<number>) {
  try {
    const data: ServiceDetails = yield call(servicesAPI.fetchDetails, action.payload)
    yield put(detailsSucceeded(data))
  } catch (error) {
    yield put(detailsFailed(error instanceof Error ? error.message : 'Неизвестная ошибка'))
  }
}

export function* watchListRequested() {
  yield takeLatest(listRequested.type, fetchListWorker)
}

export function* watchDetailsRequested() {
  yield takeLatest(detailsRequested.type, fetchDetailsWorker)
}

export function* servicesSaga() {
  yield all([watchListRequested(), watchDetailsRequested()])
}