import BaseCard from 'components/common/BaseCard'
import GlobeIcon from 'components/Icon/GlobeIcon'
import PeopleIcon from 'components/Icon/PeopleIcon'
import PhotoIcon from 'components/Icon/PhotoIcon'
import { defaultAvatar } from 'config'
import { useState } from 'react'
import type { MouseEventHandler } from 'react'
import { TweetText } from 'services/TweetText'
import { useAppContext } from 'state/AppContext'
import { useCreateNewTweetMutation } from 'hooks/fetchQueries'
import ProgressRing from './ProgressRing'

export default function TweetCompose() {
  const {
    state: { user },
    dispatch
  } = useAppContext()

  const createTweetMutation = useCreateNewTweetMutation()

  const [tweetText, setTweetText] = useState('')
  const [tweetImage, setTweetImage] = useState('')
  const [commentAllowed, setCommentAllowed] = useState('everyone')

  const submitTweet: MouseEventHandler = () => {
    if (!tweetText) return
    const textInstance = new TweetText(tweetText)
    createTweetMutation.mutate(
      {
        text: tweetText.trim(),
        image: tweetImage,
        commentAllowed,
        hashtags: textInstance.hashtags
      },
      {
        onSettled: () => {
          setTweetText('')
          setTweetImage('')
        },
        onError: () => {
          dispatch({ type: 'setAlert', payload: 'Creating Tweet Failed' })
        }
      }
    )
    // createNewTweet(tweetText.trim(), tweetImage, commentAllowed, textInstance.hashtags)
    //   .then(
    //     (t) => console.log(t),
    //     (e) => console.log(e)
    //   )
    //   .finally(() => {
    //     setTweetText('')
    //     setTweetImage('')
    //   })
  }

  const changeCommentAllowed = (allowMode: string) => () => {
    setCommentAllowed(allowMode)
  }

  const whoCanReplyMessage = `${
    commentAllowed === 'followed' ? 'People you follow' : 'Everyone'
  } can reply`

  const tweetComposeActions = (
    <div className="flex justify-between">
      <div className="flex items-center cursor-pointer icons">
        <span className="text-accent-focus">
          <PhotoIcon />
        </span>
        <div className="dropdown dropdown-hover">
          <div className="flex items-center text-accent-focus" tabIndex={0}>
            <GlobeIcon />
            <span>{whoCanReplyMessage}</span>
          </div>
          <div
            tabIndex={0}
            className="p-4 w-max shadow bg-base-100 dropdown-content menu rounded-box"
          >
            <div>
              <h5 className="font-semibold">Who can reply?</h5>
              <span className="text-sm text-gray-500">Choose who can reply to this tweet.</span>
            </div>
            <ul>
              <li
                className="flex flex-row items-center p-2 text-sm hover:bg-gray-100"
                onClick={changeCommentAllowed('everyone')}
              >
                <div className="p-1">
                  <GlobeIcon />
                </div>
                Everyone
              </li>
              <li
                className="flex flex-row items-center p-2 text-sm hover:bg-gray-100"
                onClick={changeCommentAllowed('followed')}
              >
                <div className="p-1">
                  <PeopleIcon />
                </div>
                People you follow
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ProgressRing letterCount={tweetText.length} />
        <button className="btn btn-primary" disabled={tweetText.length > 300} onClick={submitTweet}>
          Tweet
        </button>
      </div>
    </div>
  )

  return (
    <BaseCard title="Tweet Something" actions={tweetComposeActions}>
      <div className="flex items-start my-2">
        <img
          src={user.avatar || defaultAvatar}
          width="50"
          height="50"
          className="mask mask-squircle"
        />
        <textarea
          className="mx-2 w-full textarea text-base-content"
          placeholder="What's Happening"
          value={tweetText}
          onChange={(e) => {
            setTweetText(e.target.value)
          }}
        ></textarea>
      </div>
    </BaseCard>
  )
}
