import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import servicesReducer from './services/servicesSlice'
import rootSaga from './rootSaga'

const rootReducer = combineReducers({ services: servicesReducer })

export type RootState = ReturnType<typeof rootReducer>

export function setupStore(preloadedState?: Partial<RootState>) {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
    preloadedState,
  })

  sagaMiddleware.run(rootSaga)
  return store
}

export const store = setupStore()

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']