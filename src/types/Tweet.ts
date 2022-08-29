import type { TUser } from './User'

export type THashtag = {
  id: number
  text: string
}

export type TComment = {
  id: number
  text: string
  image: string
  createdAt: Date
  authorId: number
  tweetId: number
  author: TUser
  likedByUsers: TUser[]
}

export type TTweet = {
  id: number
  text: string
  image: string
  createdAt: Date
  authorId: number
  author: Omit<TUser, 'token' | 'email'>
  isSaved: boolean
  isFavorited: boolean
  isRetweeted: boolean
  savedCount: number
  commentCount: number
  retweetCount: number
  comments?: TComment[]
  retweeted?: boolean
  retweetedByUsers?: TUser[]
  favoritedByUsers?: TUser[]
  savedByUsers?: TUser[]
  hashtags?: THashtag[]
}

export type TTrend = {
  id: number
  text: string
  tweetCount: number
}

export type TRawTweet = {
  tweet_id: number
  tweet_text: string
  tweet_image: string
  tweet_commentAllowed: string
  tweet_created_at: Date
  tweet_author_id: number
  author_id: number
  author_name: string
  author_handle: string
  author_bio: string
  author_avatar: string
  favCount: number
}
