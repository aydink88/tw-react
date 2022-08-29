import Paginate from 'components/common/Paginate'
import Trends from 'components/trends/Trends'
import Timeline from 'components/tweet/Timeline'
import { useQueryTweetsByHashtag } from 'hooks/fetchQueries'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function HashtagTweetsPage() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, isPreviousData } = useQueryTweetsByHashtag(id!, page)

  return (
    <div className="flex gap-8 home">
      <div className="w-2/3">
        <Paginate page={page} setPage={setPage} isPreviousData={isPreviousData}>
          <Timeline tweets={data?.tweets} loading={isLoading || isFetching} />
        </Paginate>
      </div>
      <div className="w-1/3">
        <Trends />
      </div>
    </div>
  )
}
