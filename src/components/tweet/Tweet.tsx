import PhotoIcon from 'components/Icon/PhotoIcon'
import RefreshIcon from 'components/Icon/RefreshIcon'
import { defaultAvatar } from 'config'
import { createElement, useState } from 'react'
import type { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { commentTweet, likeComment, unlikeComment } from 'services/fetch'
import { useAppContext } from 'state/AppContext'
import type { THashtag, TTweet } from 'types'
import TweetActions from './TweetActions'
import TweetReplies from './TweetReplies'
import parse, { domToReact } from 'html-react-parser'

type TweetProps = {
  content: TTweet
  withReplies?: boolean
  profilePageOf?: string
}

export default function Tweet({ content, profilePageOf, withReplies }: TweetProps) {
  const { dispatch } = useAppContext()

  const [comment, setComment] = useState('')
  const [replies, setReplies] = useState(content.comments)

  const handleCommentSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    commentTweet(content.id, comment)
      .catch((e) => {
        console.log(e)
        dispatch({ type: 'setAlert', payload: 'Only followers can reply to this tweet!' })
      })
      .finally(() => {
        setComment('')
      })
  }

  const commentLikeOrUnlike = (id: number, alreadyLiked: boolean) => {
    const fetchOp = alreadyLiked ? unlikeComment : likeComment

    fetchOp(id).then(
      (data) => {
        setReplies((prev) => {
          const updatedReplies = [...prev!]
          const commentIndex = replies!.findIndex((r) => r.id === id)
          console.log(updatedReplies)
          console.log(data)
          console.log(commentIndex)
          updatedReplies[commentIndex] = { ...updatedReplies[commentIndex], ...data.comment }
          return updatedReplies
        })
      },
      (e) => console.log(e)
    )
  }

  const putHashtags = (tweetText: string, hashtags?: THashtag[]) => {
    if (!hashtags) return tweetText
    let newText = tweetText
    for (const h of hashtags) {
      newText = newText.replace(
        `#${h.text}`,
        `<a href="/#/trend/${h.id}" className='hashtag-link link link-hover link-primary'>#${h.text}</a>`
      )
    }

    const options: any = {
      replace: ({ attribs, children }: any) => {
        if (!attribs) {
          return
        }

        if (attribs.class === 'hashtag-link') {
          return createElement(Link, { to: attribs.href }, domToReact(children, options))
        }
      }
    }

    return parse(newText, options)
  }

  return (
    <>
      {content.retweeted && (
        <div className="flex items-center text-sm retweeted">
          <RefreshIcon size={15} />
          <span className="text-base-content/70">&nbsp;{profilePageOf} retweeted</span>
        </div>
      )}
      <div className="mt-2 mb-4 bg-base-100 card bordered">
        <div className="p-2 card-body">
          <div className="flex space-x-4 tweet-user">
            <img
              src={content.author.avatar || defaultAvatar}
              width="50"
              height="50"
              className="mask mask-squircle"
            />
            <div>
              <Link to={`/profile/${content.author.handle}`}>
                <p className="text-lg font-bold custom-title">{content.author.name}</p>
              </Link>
              <small className="text-base-content/70">
                {new Date(content.createdAt).toLocaleString()}
              </small>
            </div>
          </div>
          <div className="my-2 break-all tweet-text">
            {putHashtags(content.text, content.hashtags)}
          </div>
          {content.image && (
            <div className="tweet-image">
              <img
                src={content.image}
                alt="tweet-image"
                className="w-full rounded-lg"
                style={{
                  maxHeight: '300px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                loading="lazy"
              />
            </div>
          )}
          <div className="flex justify-end my-2 space-x-4 text-sm tweet-stats text-base-content/70">
            <span>{content.commentCount || 0} Comments</span>
            <span>{content.retweetCount || 0} Retweets</span>
            <span>{content.savedCount || 0} Saved</span>
          </div>
          <TweetActions
            id={content.id}
            retweeted={content.isRetweeted}
            liked={content.isFavorited}
            saved={content.isSaved}
            // clickRetweet={clickRetweet}
            // clickLike={clickLike}
            // clickSave={clickSave}
          />
          <div className="flex items-center m-2 max-h-12 tweet-newreply">
            <div className="p-1 w-12 h-12">
              <img
                src="https://picsum.photos/id/1005/200/200"
                height="100%"
                className="mask mask-squircle"
              />
            </div>
            <div className="flex items-center m-1 w-full rounded-md reply-input bg-base-200">
              <div className="m-2 w-full">
                <form onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    placeholder="Tweet your reply"
                    className="p-1 w-full text-sm bg-transparent outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </form>
              </div>
              <span className="mx-2 cursor-pointer">
                <PhotoIcon />
              </span>
            </div>
          </div>
          {withReplies && (
            <TweetReplies commentLikeOrUnlike={commentLikeOrUnlike} comments={replies} />
          )}
        </div>
      </div>
    </>
  )
}
