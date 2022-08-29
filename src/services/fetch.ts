import type { TUserProfile, TTweet, TComment, TTrend, TRawTweet } from 'types'
import { getJwtToken } from 'utils'

const apiUrl = import.meta.env.DEV ? '/api' : 'http://localhost:5000/api'

export const client = async <S extends string, T>(
  endpoint: string,
  method = 'get',
  body?: unknown
): Promise<Record<S, T>> => {
  let timeoutId: NodeJS.Timeout | null = null
  try {
    const controller = new AbortController()
    timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(apiUrl + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwtToken()}`
      },
      body: JSON.stringify(body),

      signal: controller.signal
    })
    if (!res.ok) {
      throw new Error('Request failed.')
    }
    const data = await res.json()
    return data
  } catch (e: any) {
    console.log(e.message)
    throw e
  } finally {
    timeoutId && clearTimeout(timeoutId)
  }
}

export const fetchFeed = (page?: number) => {
  let endpoint = '/tweet/myfeed'
  if (page) {
    endpoint += '?page=' + page
  }

  return client<'feed', TTweet[]>(endpoint)
}

export function fetchReplies(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}`)
}

export function fetchProfileOf(handle: string) {
  return client<'profile', TUserProfile>('/follow/' + handle)
}

export function fetchFollowersOf(userId: number) {
  return client<'followers', TUserProfile[]>('/follow/followers/' + userId)
}

export function fetchFollowingOf(userId: number) {
  return client<'following', TUserProfile[]>('/follow/following/' + userId)
}

export function fetchFollowingAndAmIFollowing(userId: number) {
  return client<'commons', TUserProfile[]>('/follow/amifollowingfollowers/' + userId)
}

export function fetchRecommendedUsers() {
  return client<'recommendations', TUserProfile[]>('/follow/recommendations')
}

export function followProfileOf(handle: string) {
  return client<'profile', TUserProfile>('/follow/' + handle, 'post')
}

export function unfollowProfileOf(handle: string) {
  return client<'profile', TUserProfile>('/follow/' + handle, 'delete')
}

export function fetchTweetsOf(
  handle: string,
  withReplies?: boolean,
  onlyMedia?: boolean,
  likedTweets?: boolean
) {
  let endpoint = `/tweet/user/${handle}`
  withReplies && (endpoint += '?replies=1')
  onlyMedia && (endpoint += '?media=1')
  if (likedTweets) {
    endpoint = `/tweet/favorites/${handle}`
  }
  return client<'tweets', TTweet[]>(endpoint)
}

export function fetchSavedTweets(queryType: string) {
  let endpoint = '/tweet/saves'
  switch (queryType) {
    case 'tweets':
      break
    case 'replies':
      endpoint += '?replies=1'
      break
    case 'media':
      endpoint += '?media=1'
      break
    case 'likes':
      endpoint += '?likes=1'
  }

  return client<'savedTweets', TTweet[]>(endpoint)
}

export function fetchSearchPeople(searchTerm = '') {
  let endpoint = '/user/search'
  if (searchTerm) {
    endpoint += `?search=${searchTerm}`
  }

  return client<'people', TUserProfile[]>(endpoint)
}

export function fetchSearchTweets(searchType: string, searchTerm?: string) {
  let endpoint = ''
  switch (searchType) {
    case 'latest':
      endpoint = '/tweet/search/latest'
      break
    case 'top':
      endpoint = '/tweet/search/top'
      break
    case 'media':
      endpoint = '/tweet/search/media'
  }

  if (searchTerm) {
    endpoint += `?search=${searchTerm}`
  }
  return client<'tweets', TTweet[]>(endpoint)
}

export function fetchTopTweets() {
  return client<'topTweets', TRawTweet[]>('/tweet/top')
}

export function fetchLatestTweets(onlyMedia: boolean) {
  let endpoint = '/tweet/latest'

  if (onlyMedia) {
    endpoint += '?media=1'
  }

  return client<'latestTweets', TTweet[]>(endpoint)
}

export function createNewTweet(
  text: string,
  image: string,
  commentAllowed?: string,
  hashtags?: string[]
) {
  return client<'tweet', TTweet>(`/tweet`, 'post', { text, image, commentAllowed, hashtags })
}

export function fetchTrends() {
  return client<'trends', TTrend[]>(`/tweet/trends`)
}

export function fetchTweetsByHashtag(id: number) {
  return client<'tweets', TTweet[]>(`/tweet/hashtag/${id}`)
}

export function retweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/retweet`, 'post')
}

export function unretweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/retweet`, 'delete')
}

export function favoriteTweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/favorite`, 'post')
}

export function unfavoriteTweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/favorite`, 'delete')
}

export function saveTweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/save`, 'post')
}

export function unsaveTweet(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}/save`, 'delete')
}

export function commentTweet(id: number, comment: string) {
  return client<'comment', TComment>(`/comment/${id}`, 'post', { text: comment.trim() })
}

export function removeCommentTweet(id: number) {
  return client<'comment', TComment>(`/tweet/${id}/comment`, 'delete')
}

export function likeComment(id: number) {
  return client<'comment', TComment>(`/comment/${id}/like`, 'post')
}

export function unlikeComment(id: number) {
  return client<'comment', TComment>(`/comment/${id}/like`, 'delete')
}
