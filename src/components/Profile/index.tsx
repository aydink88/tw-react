import Paginate from 'components/common/Paginate'
import Timeline from 'components/tweet/Timeline'
import TimelineMenu from 'components/tweet/TimelineMenu'
import { useQueryProfileOf, useQueryTweetsOf } from 'hooks/fetchQueries'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { followProfileOf, unfollowProfileOf } from 'services/fetch'
import type { TProfileFeedOption, TTimelineMenu } from 'types'
import ProfileUserCard from './ProfileUserCard'

function ProfilePage() {
  const { handle } = useParams<{ handle: string }>()
  const [tweetsPage, setTweetsPage] = useState(1)
  // temporary solution to force rerender

  const [feedOption, setFeedOption] = useState<TProfileFeedOption>('tweets')
  const { data: profileData, isLoading: profileInfoLoading } = useQueryProfileOf(handle)
  const {
    data: tweetsData,
    isLoading: profileFeedLoading,
    isFetching: isFeedFetching,
    isPreviousData
  } = useQueryTweetsOf(
    handle,
    feedOption === 'replies',
    feedOption === 'media',
    feedOption === 'likes',
    tweetsPage
  )

  const feedOptionMenu: TTimelineMenu = [
    { text: 'Tweets', id: 'tweets' },
    { text: 'Tweets & Replies', id: 'replies' },
    { text: 'Media', id: 'media' },
    { text: 'Likes', id: 'likes' }
  ]

  const queryClient = useQueryClient()

  const followMutation = useMutation(followProfileOf)
  const unfollowMutation = useMutation(unfollowProfileOf)

  const toggleFollowRequest = () => {
    if (!profileData) return
    const mutation = profileData.profile.isFollowed ? unfollowMutation : followMutation
    mutation.mutate(profileData.profile.handle, {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchProfileOf')
      }
    })
  }

  return (
    <div className="profile">
      <div className="overflow-hidden h-48 banner-bg">
        <img
          className="object-cover object-center w-full h-full"
          src="https://images.pexels.com/photos/5589173/pexels-photo-5589173.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          alt="banner"
        />
      </div>
      {profileData && (
        <ProfileUserCard user={profileData.profile} toggleFollow={toggleFollowRequest} />
      )}
      <div className="flex gap-x-12 items-start mt-8">
        <div className="w-1/4">
          <TimelineMenu
            options={feedOptionMenu}
            activeOption={feedOption}
            setActiveOption={setFeedOption}
          />
        </div>
        <div className="w-3/4">
          <Paginate page={tweetsPage} setPage={setTweetsPage} isPreviousData={isPreviousData}>
            <Timeline
              loading={profileInfoLoading || profileFeedLoading || isFeedFetching}
              tweets={tweetsData?.tweets}
              withReplies={feedOption === 'replies'}
              profilePageOf={profileData?.profile.name}
            />
          </Paginate>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
