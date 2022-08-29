import CommentIcon from 'components/Icon/CommentIcon'
import LikeIcon from 'components/Icon/LikeIcon'
import RefreshIcon from 'components/Icon/RefreshIcon'
import SaveIcon from 'components/Icon/SaveIcon'
import { useState } from 'react'
import { useMutation } from 'react-query'
import {
  favoriteTweet,
  retweet,
  saveTweet,
  unfavoriteTweet,
  unretweet,
  unsaveTweet
} from 'services/fetch'

type TTweetActions = {
  id: number
  retweeted?: boolean
  liked?: boolean
  saved?: boolean
}

export default function TweetActions(props: TTweetActions) {
  const [retweeted, setRetweeted] = useState(props.retweeted)
  const [favorited, setFavorited] = useState(props.liked)
  const [saved, setSaved] = useState(props.saved)

  // const checkUserInteraction = (users: TUser[], viewerId: number) => {
  //   const result = users.findIndex((u) => u.id === viewerId)
  //   // if (result === undefined) {
  //   //   return false
  //   // } else
  //   return !!(result > -1)
  // }

  // useEffect(() => {
  //   if (viewer?.id && content.retweetedByUsers?.length) {
  //     setRetweeted(checkUserInteraction(content.retweetedByUsers!, viewer.id))
  //   }
  // }, [content.retweetedByUsers, viewer?.id])

  // useEffect(() => {
  //   if (viewer?.id && content.favoritedByUsers?.length) {
  //     setFavorited(checkUserInteraction(content.favoritedByUsers!, viewer.id))
  //   }
  // }, [content.favoritedByUsers, viewer?.id])

  // useEffect(() => {
  //   if (viewer?.id && content.savedByUsers?.length) {
  //     setSaved(checkUserInteraction(content.savedByUsers!, viewer.id))
  //   }
  // }, [content.savedByUsers, viewer?.id])

  const clickRetweet = () => {
    const action = retweeted ? unretweet : retweet
    return action(String(props.id))
      .then((data) => {
        setRetweeted((r) => !r)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  const clickFavorite = () => {
    const action = favorited ? unfavoriteTweet : favoriteTweet
    action(String(props.id))
      .then((data) => {
        setFavorited((f) => !f)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  const clickSave = () => {
    const action = saved ? unsaveTweet : saveTweet
    action(String(props.id))
      .then((data) => {
        setSaved((s) => !s)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="grid grid-cols-4 gap-4 text-sm tweet-actions">
      <div className="flex gap-1 justify-center items-center py-2 cursor-pointer comment hover:bg-base-300">
        <CommentIcon />
        <span>Comment</span>
      </div>
      <div
        className={`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${
          retweeted ? 'text-green-500' : ''
        }`}
        onClick={clickRetweet}
      >
        <RefreshIcon />
        <span>{retweeted ? 'Retweeted' : 'Retweet'}</span>
      </div>
      <div
        className={`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${
          favorited ? 'text-red-500' : ''
        }`}
        onClick={clickFavorite}
      >
        <LikeIcon />
        <span>{favorited ? 'Liked' : 'Like'}</span>
      </div>
      <div
        className={`comment flex items-center justify-center gap-1 py-2 cursor-pointer hover:bg-base-300 ${
          saved ? 'text-blue-500' : ''
        }`}
        onClick={clickSave}
      >
        <SaveIcon />
        <span>{saved ? 'Saved' : 'Save'}</span>
      </div>
    </div>
  )
}
