import BaseCard from 'components/common/BaseCard'
import { useQueryTrends } from 'hooks/fetchQueries'
import { Link } from 'react-router-dom'

export default function Trends() {
  const { data } = useQueryTrends()

  return (
    <BaseCard title="Trends for you">
      <ul>
        {data?.trends.map((trend) => (
          <li key={trend.id} className="mb-2">
            <Link to={`/trend/${trend.id}`}>
              <p>#{trend.text}</p>
            </Link>
            <small>{trend.tweetCount} tweets</small>
          </li>
        ))}
      </ul>
    </BaseCard>
  )
}
