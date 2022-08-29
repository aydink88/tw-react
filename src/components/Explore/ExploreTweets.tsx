import Paginate from 'components/common/Paginate'
import Timeline from 'components/tweet/Timeline'
import { useQuerySearchTweets } from 'hooks/fetchQueries'
import { type Dispatch, type SetStateAction } from 'react'

export default function ExploreTweets({
  timelineOption,
  searchTerm,
  page,
  setPage
}: {
  timelineOption: string
  searchTerm: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
}) {
  const { data, isLoading, isFetching, isPreviousData } = useQuerySearchTweets({
    searchType: timelineOption,
    searchTerm,
    page
  })

  return (
    <Paginate isPreviousData={isPreviousData} page={page} setPage={setPage}>
      <Timeline loading={isLoading || isFetching} tweets={data?.tweets} />
    </Paginate>
  )
}
