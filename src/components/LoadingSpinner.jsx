const LoadingSpinner = ({ label }) => (
  <div className="loading-spinner" role="status" aria-live="polite">
    <div className="ai-spinner" aria-hidden="true"></div>
    {label ? <span>{label}</span> : null}
  </div>
)

export default LoadingSpinner
