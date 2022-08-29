import Spinner from 'components/common/Spinner'
import type { TTweet } from 'types'
import Tweet from './Tweet'

export default function Timeline({
  tweets = [],
  withReplies = false,
  profilePageOf = '',
  loading
}: {
  tweets?: TTweet[]
  withReplies?: boolean
  profilePageOf?: string
  loading: boolean
}) {
  if (loading) return <Spinner />

  return (
    <>
      {tweets.length ? (
        tweets.map((t) => (
          <Tweet key={t.id} content={t} withReplies={withReplies} profilePageOf={profilePageOf} />
        ))
      ) : (
        <h1>No Content Found</h1>
      )}
    </>
  )
}
