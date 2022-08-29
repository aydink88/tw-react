import { TTweet } from './Tweet'

export type TUser = {
  id: number
  name: string
  email: string
  avatar: string
  token: string
  bio: string
  handle: string
}

export type TUserProfile = {
  id: number
  handle: string
  name: string
  bio: string
  avatar: string
  isFollowed: boolean
  followerCount: number
  followingCount: number
}

export type TProfileFeed = {
  tweets: TTweet[]
  retweets: TTweet[]
  favorites: TTweet[]
}
