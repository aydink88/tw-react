import AddUserIcon from 'components/Icon/AddUserIcon'
import type { TUserProfile } from 'types'
import { defaultAvatar } from 'config'
import { fetchFollowersOf, fetchFollowingOf } from 'services/fetch'
import { useState } from 'react'
import FollowList from './FollowList'

export default function ProfileUserCard({
  user,
  toggleFollow
}: {
  user: TUserProfile
  toggleFollow(): void
}) {
  const [followerList, setFollowerList] = useState([] as TUserProfile[])
  const [followingList, setFollowingList] = useState([] as TUserProfile[])

  const getFollowersOfProfile = () => {
    fetchFollowersOf(user.id)
      .then((d) => setFollowerList(d.followers))
      .catch((e) => console.log(e))
  }

  const getFollowingOfProfile = () => {
    fetchFollowingOf(user.id)
      .then((d) => setFollowingList(d.following))
      .catch((e) => console.log(e))
  }

  return (
    <div className="overflow-visible gap-x-4 p-4 -mt-12 w-full bg-base-100 card card-side bordered">
      <div className="avatar">
        <div className="-mt-10 w-24 h-24 rounded border bg-base-100">
          <img className="p-1" src={defaultAvatar} alt="avatar" />
        </div>
      </div>
      <div className="w-full details">
        <div className="flex justify-between items-center follow">
          <div className="flex gap-x-4 follow-info">
            <h4 className="card-title">{user.name}</h4>
            <div>
              <span className="font-bold">{user.followerCount} </span>
              <FollowList
                listType="followers"
                list={followerList}
                onLabelClick={getFollowersOfProfile}
                username={user.name}
              />
            </div>
            <div>
              <span className="font-bold">{user.followingCount} </span>
              <FollowList
                listType="following"
                list={followingList}
                onLabelClick={getFollowingOfProfile}
                username={user.name}
              />
            </div>
          </div>
          <div className="follow-button">
            <button
              className={`btn btn-sm ${user.isFollowed ? ' btn-error' : ' btn-primary'}`}
              onClick={toggleFollow}
            >
              <AddUserIcon size={20} />
              &nbsp;{user.isFollowed ? 'UnFollow' : 'Follow'}
            </button>
          </div>
        </div>
        <div className="bio">{user.bio}</div>
      </div>
    </div>
  )
}
