import { useMutation, useQuery, useQueryClient } from 'react-query'
import { client } from 'services/fetch'
import type { TUserProfile, TTweet, TComment, TTrend, TRawTweet } from 'types'

export const useQueryFeed = (page = 1, limit = 5) => {
  const queryResult = useQuery(
    ['mainFeed', page],
    () => {
      let endpoint = '/tweet/myfeed'
      endpoint += '?page=' + page
      endpoint += '&limit=' + limit

      return client<'feed', TTweet[]>(endpoint)
    },
    { keepPreviousData: true }
  )
  return queryResult
}

export function fetchReplies(id: string) {
  return client<'tweet', TTweet>(`/tweet/${id}`)
}

export function useQueryProfileOf(handle?: string) {
  const queryResult = useQuery(['fetchProfileOf', handle], () => {
    return client<'profile', TUserProfile>('/follow/' + handle)
  })
  return queryResult
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

export function useQueryRecommendedUsers() {
  const queryResult = useQuery(['recommendedUsers'], () => {
    return client<'recommendations', TUserProfile[]>('/follow/recommendations')
  })
  return queryResult
}

// export function useMutationToggleFollow(handle?: string, toFollow?: boolean) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation(
//     () => client<'profile', TUserProfile>('/follow/' + handle, toFollow ? 'post' : 'delete'),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('fetchProfileOf')
//       }
//     }
//   )
//   return mutation
// }

export function followProfileOf(handle: string) {
  return client<'profile', TUserProfile>('/follow/' + handle, 'post')
}

export function unfollowProfileOf(handle: string) {
  return client<'profile', TUserProfile>('/follow/' + handle, 'delete')
}

export function useQueryTweetsOf(
  handle?: string,
  withReplies?: boolean,
  onlyMedia?: boolean,
  likedTweets?: boolean,
  page?: number,
  limit?: number
) {
  const queryResult = useQuery(
    ['fetchTweetsOf', { handle, withReplies, onlyMedia, likedTweets, page, limit }],
    () => {
      let endpoint = `/tweet/user/${handle}?page=${page || 1}&limit=${limit || 20}`
      withReplies && (endpoint += '&replies=1')
      onlyMedia && (endpoint += '&media=1')
      if (likedTweets) {
        endpoint = `/tweet/favorites/${handle}?page=${page || 1}&limit=${limit || 20}`
      }
      return client<'tweets', TTweet[]>(endpoint)
    },
    { keepPreviousData: true }
  )
  return queryResult
}

export function useQuerySavedTweets(queryType: string, page = 1, limit = 20) {
  const queryResult = useQuery(
    ['savedTweets', queryType, page, limit],
    () => {
      let endpoint = `/tweet/saves?page=${page}&limit=${limit}`
      switch (queryType) {
        case 'tweets':
          break
        case 'replies':
          endpoint += '&replies=1'
          break
        case 'media':
          endpoint += '&media=1'
          break
        case 'likes':
          endpoint += '&likes=1'
      }

      return client<'savedTweets', TTweet[]>(endpoint)
    },
    { keepPreviousData: true }
  )
  return queryResult
}

export function useQuerySearchPeople({ page = 1, limit = 20, searchTerm = '' }) {
  const queryResult = useQuery(
    ['searchPeople', searchTerm, page, limit],
    () => {
      let endpoint = `/user/search?page=${page}&limit=${limit}`
      if (searchTerm) {
        endpoint += `&search=${searchTerm}`
      }

      return client<'people', TUserProfile[]>(endpoint)
    },
    { keepPreviousData: true }
  )

  return queryResult
}

export function useQuerySearchTweets({
  searchType = 'top',
  page = 1,
  limit = 20,
  searchTerm = ''
}) {
  const queryResult = useQuery(
    ['searchTweets', searchType, searchTerm, page, limit],
    () => {
      let endpoint = `/tweet/search/`
      switch (searchType) {
        case 'latest':
          endpoint += 'latest'
          break
        case 'top':
          endpoint += 'top'
          break
        case 'media':
          endpoint += 'media'
      }

      endpoint += `?page=${page}&limit=${limit}`

      if (searchTerm) {
        endpoint += `&search=${searchTerm}`
      }
      return client<'tweets', TTweet[]>(endpoint)
    },
    { keepPreviousData: true }
  )

  return queryResult
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

export function useCreateNewTweetMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newTweet: { text: string; image: string; commentAllowed?: string; hashtags?: string[] }) => {
      return client<'tweet', TTweet>(`/tweet`, 'post', newTweet)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mainFeed')
      }
    }
  )

  return mutation
}

// export function createNewTweet(
//   text: string,
//   image: string,
//   commentAllowed?: string,
//   hashtags?: string[]
// ) {
//   return client<'tweet', TTweet>(`/tweet`, 'post', { text, image, commentAllowed, hashtags })
// }

export function useQueryTrends() {
  const queryResult = useQuery('trends', () => {
    return client<'trends', TTrend[]>(`/tweet/trends`)
  })

  return queryResult
}

export function useQueryTweetsByHashtag(id: string, page = 1, limit = 20) {
  const queryResult = useQuery(
    ['tweetsByHashtag', id, page, limit],
    () => {
      return client<'tweets', TTweet[]>(`/tweet/hashtag/${id}?page=${page}&limit=${limit}`)
    },
    { keepPreviousData: true }
  )

  return queryResult
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
