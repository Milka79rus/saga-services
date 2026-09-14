import spinnerImg from '../assets/spinner.png'

export function Spinner() {
  return (
    <div className="state-box">
      <img className="spinner" src={spinnerImg} alt="Загрузка..." />
    </div>
  )
}