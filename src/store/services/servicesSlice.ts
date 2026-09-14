import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ServiceDetails, ServiceListItem } from '../../api/servicesAPI'

export interface RequestState<T> {
  data: T
  loading: boolean
  error: string | null
}

export interface ServicesSliceState {
  list: RequestState<ServiceListItem[]>
  details: RequestState<ServiceDetails | null>
}

const initialState: ServicesSliceState = {
  list: { data: [], loading: false, error: null },
  details: { data: null, loading: false, error: null },
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    listRequested(state) {
      state.list.loading = true
      state.list.error = null
    },
    listSucceeded(state, action: PayloadAction<ServiceListItem[]>) {
      state.list.loading = false
      state.list.error = null
      state.list.data = action.payload
    },
    listFailed(state, action: PayloadAction<string>) {
      state.list.loading = false
      state.list.error = action.payload
    },

    detailsRequested(state, _action: PayloadAction<number>) {
      state.details.loading = true
      state.details.error = null
      state.details.data = null
    },
    detailsSucceeded(state, action: PayloadAction<ServiceDetails>) {
      state.details.loading = false
      state.details.error = null
      state.details.data = action.payload
    },
    detailsFailed(state, action: PayloadAction<string>) {
      state.details.loading = false
      state.details.error = action.payload
    },

    detailsCleared(state) {
      state.details = initialState.details
    },
  },
})

export const {
  listRequested,
  listSucceeded,
  listFailed,
  detailsRequested,
  detailsSucceeded,
  detailsFailed,
  detailsCleared,
} = servicesSlice.actions

export default servicesSlice.reducer