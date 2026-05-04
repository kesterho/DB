const Badge = ({ label, variant = 'neutral' }) => (
  <span className={`badge ${variant}`.trim()}>{label}</span>
)

export default Badge
