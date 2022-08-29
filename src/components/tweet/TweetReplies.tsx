import LikeIcon from 'components/Icon/LikeIcon'
import { defaultAvatar } from 'config'
import { useMemo } from 'react'
import { useAppContext } from 'state/AppContext'
import type { TComment } from 'types'

export default function TweetReplies({
  comments = [],
  commentLikeOrUnlike
}: {
  comments?: TComment[]
  commentLikeOrUnlike: (id: number, alreadyLiked: boolean) => void
}) {
  const {
    state: { user: viewer }
  } = useAppContext()

  return (
    <div className="m-2 comments">
      {comments.length
        ? comments.map((r) => (
            <TweetReply
              key={r.id}
              comment={r}
              viewerId={viewer.id}
              commentLikeOrUnlike={commentLikeOrUnlike}
            />
          ))
        : null}
    </div>
  )
}

function TweetReply({
  comment,
  viewerId,
  commentLikeOrUnlike
}: {
  comment: TComment
  viewerId: number
  commentLikeOrUnlike(id: number, liked: boolean): void
}) {
  const commentLiked = useMemo(() => {
    const idx = comment.likedByUsers.findIndex((u) => u.id === viewerId)
    return idx > -1
  }, [comment.likedByUsers, viewerId])

  return (
    <div key={comment.id} className="flex gap-2 items-start mb-4 reply-wrapper">
      <div className="overflow-hidden m-2 h-10 rounded-lg avatar">
        <img src={comment.author.avatar || defaultAvatar} alt="avatar" />
      </div>
      <div className="p-1 w-full reply">
        <div className="rounded reply-text bg-base-200">
          <div className="flex gap-8 items-center">
            <span className="font-medium custom-title">{comment.author.name}</span>
            <span className="text-sm text-base-content/70">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div>{comment.text}</div>
        </div>
        <div className="flex gap-4 text-xs likes">
          <span
            className={`flex items-center gap-1 ${commentLiked ? 'text-red-500' : ''}`}
            onClick={() => commentLikeOrUnlike(comment.id, commentLiked)}
          >
            <LikeIcon size={12} /> {commentLiked ? ' Liked' : ' Like'}
          </span>
          <span>{comment.likedByUsers.length} Likes</span>
        </div>
      </div>
    </div>
  )
}
