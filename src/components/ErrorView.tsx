interface ErrorViewProps {
  message: string
  onRetry: () => void
}


export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="state-box">
      <div className="error-panel">
        <span className="error-text">{message}</span>
        <button className="btn-retry" type="button" onClick={onRetry}>
          Повторить запрос
        </button>
      </div>
    </div>
  )
}