export type TProfileFeedOption = 'tweets' | 'replies' | 'media' | 'likes'

export type TExploreFeedOption = 'top' | 'latest' | 'people' | 'media'

export type TTimelineOption = TProfileFeedOption | TExploreFeedOption

export type TTimelineMenu = { id: TTimelineOption; text: string }[]
