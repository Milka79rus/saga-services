import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorView } from '../components/ErrorView'
import { Spinner } from '../components/Spinner'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { detailsCleared, detailsRequested } from '../store/services/servicesSlice'
import {
  selectDetails,
  selectDetailsError,
  selectDetailsLoading,
} from '../store/services/servicesSelectors'

export function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const serviceId = Number(id)

  const dispatch = useAppDispatch()
  const details = useAppSelector(selectDetails)
  const loading = useAppSelector(selectDetailsLoading)
  const error = useAppSelector(selectDetailsError)

  useEffect(() => {
    if (!Number.isFinite(serviceId)) return
    dispatch(detailsRequested(serviceId))
  }, [dispatch, serviceId])

  useEffect(() => () => { dispatch(detailsCleared()) }, [dispatch])

  if (loading) return <Spinner />

  if (error) {
    return <ErrorView message={error} onRetry={() => dispatch(detailsRequested(serviceId))} />
  }

  if (!details) return null

  return (
    <section>
      <Link className="back-link" to="/">← К списку услуг</Link>
      <article className="details-card">
        <h1 className="page-title">{details.name}</h1>
        <p className="details-price">{details.price.toLocaleString('ru-RU')} ₽</p>
        <p className="details-content">{details.content}</p>
      </article>
    </section>
  )
}