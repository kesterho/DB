const ErrorState = ({ title, description, onRetry, retryLabel }) => (
  <div className="error-state glass">
    <h3>{title}</h3>
    {description ? <p>{description}</p> : null}
    {onRetry ? (
      <button className="btn primary" type="button" onClick={onRetry}>
        {retryLabel}
      </button>
    ) : null}
  </div>
)

export default ErrorState
