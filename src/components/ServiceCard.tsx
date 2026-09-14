import { Link } from 'react-router-dom'

interface ServiceCardProps {
  id: number
  name: string
  price: number
}

export function ServiceCard({ id, name, price }: ServiceCardProps) {
  return (
    <Link className="service-card" to={`/${id}/details`}>
      <span className="service-name">{name}</span>
      <span className="service-price">{price.toLocaleString('ru-RU')} ₽</span>
    </Link>
  )
}