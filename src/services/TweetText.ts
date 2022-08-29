const hashtagRegex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm
const mentionRegex = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm
const urlRegex = /\b(https?:\/\/\S*\b)/g

export class TweetText {
  public hashtags: string[]
  public mentions: string[]
  public urls: string[]

  constructor(public text: string) {
    this.hashtags = this.getRegexMatches(hashtagRegex)
    this.mentions = this.getRegexMatches(mentionRegex)
    this.urls = this.getRegexMatches(urlRegex)
  }

  private getRegexMatches(regex: RegExp) {
    const matches = []
    let match

    while ((match = regex.exec(this.text))) {
      matches.push(match[1])
    }

    return matches
  }
}
