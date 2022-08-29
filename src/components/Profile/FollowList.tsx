import AppModal from 'components/common/Modal'
import { defaultAvatar } from 'config'
import type { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import type { TUserProfile } from 'types'

export default function FollowList({
  list,
  username,
  onLabelClick,
  listType
}: {
  list: TUserProfile[]
  username: string
  onLabelClick: MouseEventHandler
  listType: 'followers' | 'following'
}) {
  let cardTitle = ''
  switch (listType) {
    case 'followers':
      cardTitle = `${username} is followed by`
      break
    case 'following':
      cardTitle = `${username} is following`
      break
    default:
      break
  }

  return (
    <AppModal modalId={`${listType}-list-modal`} label={listType} onLabelClick={onLabelClick}>
      <h3 className="mb-4 font-semibold custom-title">{cardTitle}</h3>
      {list.map((listMember) => (
        <div key={listMember.id}>
          <hr />
          <div className="flex items-start my-2">
            <div className="my-2 follow-list-user">
              <div className="flex follow-list-info">
                <div className="p-2 w-16 h-16 avatar follow-list-avatar">
                  <img
                    className="mask mask-squircle"
                    src={listMember.avatar || defaultAvatar}
                    alt={listMember.name}
                  />
                </div>
                <div>
                  <Link to={`/profile/${listMember.handle}`}>
                    <h2 className="font-medium custom-title follow-list-name">{listMember.name}</h2>
                  </Link>
                  <div className="text-sm text-base-content/70 follow-list-count">
                    {listMember.followerCount} {` ${listType}`}
                  </div>
                </div>
              </div>
              <div className="p-2 text-sm text-base-content/70 follow-list-bio">
                {listMember.bio}
              </div>
            </div>
            <div className="ml-auto follow-list-button">
              <button className="btn btn-sm btn-primary">Follow</button>
            </div>
          </div>
        </div>
      ))}
    </AppModal>
  )
}
