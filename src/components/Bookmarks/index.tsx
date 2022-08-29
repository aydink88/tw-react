import PageLayout from 'components/common/PageLayout'
import Paginate from 'components/common/Paginate'
import Timeline from 'components/tweet/Timeline'
import TimelineMenu from 'components/tweet/TimelineMenu'
import { useQuerySavedTweets } from 'hooks/fetchQueries'
import { useEffect, useState } from 'react'
import type { TTimelineMenu, TTimelineOption } from 'types'

function BookmarksPage() {
  const [timelineOption, setTimelineOption] = useState<TTimelineOption>('tweets')

  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, isPreviousData } = useQuerySavedTweets(timelineOption, page)

  const timelineOptions: TTimelineMenu = [
    { text: 'Tweets', id: 'tweets' },
    { text: 'Tweets & Replies', id: 'replies' },
    { text: 'Media', id: 'media' },
    { text: 'Likes', id: 'likes' }
  ]

  useEffect(() => {
    setPage(1)
  }, [timelineOption])

  return (
    <PageLayout>
      <PageLayout.Side>
        <TimelineMenu
          options={timelineOptions}
          activeOption={timelineOption}
          setActiveOption={setTimelineOption}
        />
      </PageLayout.Side>
      <PageLayout.Main>
        <Paginate page={page} setPage={setPage} isPreviousData={isPreviousData}>
          <Timeline
            loading={isLoading || isFetching}
            tweets={data?.savedTweets}
            withReplies={timelineOption === 'replies'}
          />
        </Paginate>
      </PageLayout.Main>
    </PageLayout>
  )
}

export default BookmarksPage
