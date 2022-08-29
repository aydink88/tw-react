import BaseCard from 'components/common/BaseCard'
import Paginate from 'components/common/Paginate'
import Trends from 'components/trends/Trends'
import Timeline from 'components/tweet/Timeline'
import TweetCompose from 'components/tweet/TweetCompose'
import { defaultAvatar } from 'config'
import { useQueryFeed, useQueryRecommendedUsers } from 'hooks/fetchQueries'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { followProfileOf } from 'services/fetch'

function HomePage() {
  // TODO: next page button in the end or infinite scroll
  const [page, setPage] = useState(1)
  const location = useLocation()
  console.log(location)

  const { data: feedData, isLoading, isPreviousData, isFetching } = useQueryFeed(page)

  const { data: recommendedUsersData } = useQueryRecommendedUsers()

  const queryClient = useQueryClient()
  const followMutation = useMutation(followProfileOf)

  const clickFollow = (handle: string) => {
    followMutation.mutate(handle, {
      onSuccess: () => queryClient.invalidateQueries('recommendedUsers')
    })
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row home">
      <div className="mx-auto w-full sm:w-5/6 lg:w-2/3">
        <TweetCompose></TweetCompose>
        <Paginate isPreviousData={isPreviousData} page={page} setPage={setPage}>
          <Timeline loading={isLoading || isFetching} tweets={feedData?.feed} />
        </Paginate>
      </div>
      <div className="mx-auto w-full sm:w-5/6 lg:w-1/3">
        <Trends />
        <BaseCard title="Who to Follow">
          {recommendedUsersData?.recommendations.map((listMember) => (
            <div key={listMember.id}>
              <div className="flex items-start">
                <div className="follow-list-user">
                  <div className="flex follow-list-info">
                    <div className="p-2 w-12 h-12 avatar follow-list-avatar">
                      <img
                        className="mask mask-squircle"
                        src={listMember.avatar || defaultAvatar}
                        alt={listMember.name}
                      />
                    </div>
                    <div>
                      <Link to={`/profile/${listMember.handle}`}>
                        <h2 className="font-medium custom-title follow-list-name">
                          {listMember.name}
                        </h2>
                      </Link>
                      <div className="text-sm text-base-content/70 follow-list-count">
                        {listMember.followerCount} {` followers`}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 text-sm text-base-content/70 follow-list-bio">
                    {listMember.bio}
                  </div>
                </div>
                <div className="ml-auto follow-list-button">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      clickFollow(listMember.handle)
                    }}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </BaseCard>
      </div>
    </div>
  )
}

export default HomePage
