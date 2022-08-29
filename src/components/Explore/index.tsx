import TimelineMenu from 'components/tweet/TimelineMenu'
import { useEffect, useRef, useState } from 'react'
import type { FormEventHandler } from 'react'
import type { TTimelineMenu, TTimelineOption } from 'types'
import ExplorePeople from './ExplorePeople'
import ExploreTweets from './ExploreTweets'
import PageLayout from 'components/common/PageLayout'

function ExplorePage() {
  const [timelineOption, setTimelineOption] = useState<TTimelineOption>('top')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const timelineOptions: TTimelineMenu = [
    { text: 'Top', id: 'top' },
    { text: 'Latest', id: 'latest' },
    { text: 'People', id: 'people' },
    { text: 'Media', id: 'media' }
  ]

  useEffect(() => {
    setPage(1)
  }, [timelineOption, searchTerm])

  const searchInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setSearchTerm(searchInputRef.current!.value)
  }, [timelineOption])

  const searchSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setSearchTerm(searchInputRef.current!.value)
  }

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
        <div className="flex relative mb-4">
          <div className="absolute top-1/2 left-2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <form className="input-group" onSubmit={searchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              className="pl-8 w-full input input-bordered"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        {timelineOption === 'people' ? (
          <ExplorePeople page={page} setPage={setPage} searchTerm={searchTerm} />
        ) : (
          <ExploreTweets
            page={page}
            setPage={setPage}
            searchTerm={searchTerm}
            timelineOption={timelineOption}
          />
        )}
      </PageLayout.Main>
    </PageLayout>
  )
}

export default ExplorePage
