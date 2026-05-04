const EmptyState = ({ title, description, action }) => (
  <div className="empty-state glass">
    <div className="empty-illustration" aria-hidden="true"></div>
    <h3>{title}</h3>
    {description ? <p>{description}</p> : null}
    {action}
  </div>
)

export default EmptyState
