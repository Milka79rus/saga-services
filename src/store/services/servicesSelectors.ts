import type { RootState } from '../store'

export const selectListState = (state: RootState) => state.services.list
export const selectList = (state: RootState) => state.services.list.data
export const selectListLoading = (state: RootState) => state.services.list.loading
export const selectListError = (state: RootState) => state.services.list.error

export const selectDetailsState = (state: RootState) => state.services.details
export const selectDetails = (state: RootState) => state.services.details.data
export const selectDetailsLoading = (state: RootState) => state.services.details.loading
export const selectDetailsError = (state: RootState) => state.services.details.error