import { useEffect } from 'react'
import { ErrorView } from '../components/ErrorView'
import { ServiceCard } from '../components/ServiceCard'
import { Spinner } from '../components/Spinner'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { listRequested } from '../store/services/servicesSlice'
import {
  selectList,
  selectListError,
  selectListLoading,
} from '../store/services/servicesSelectors'

export function ServicesListPage() {
  const dispatch = useAppDispatch()
  const services = useAppSelector(selectList)
  const loading = useAppSelector(selectListLoading)
  const error = useAppSelector(selectListError)


  useEffect(() => {
    if (services.length === 0) {
      dispatch(listRequested())
    }
  }, [dispatch, services.length])

  if (loading) return <Spinner />

  if (error) {
    return <ErrorView message={error} onRetry={() => dispatch(listRequested())} />
  }

  return (
    <section>
      <h1 className="page-title">Услуги</h1>
      {services.length === 0 ? (
        <p className="empty-text">Список услуг пуст.</p>
      ) : (
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              price={service.price}
            />
          ))}
        </div>
      )}
    </section>
  )
}