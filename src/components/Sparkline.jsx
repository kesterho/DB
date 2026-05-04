import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

const Sparkline = ({ data = [], color = 'var(--accent-teal)' }) => (
  <div className="sparkline">
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Tooltip contentStyle={{ display: 'none' }} />
        <Line
          type="monotone"
          dataKey="priceHKD"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
)

export default Sparkline
