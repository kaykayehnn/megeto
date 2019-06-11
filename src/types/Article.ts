export interface Author {
  name: string
  avatar_urls: {
    wordpress_96: string
  }
}

export interface FeaturedMedia {
  source_url: string
  alt_text: string
}

export default interface Article {
  title: string
  date: string
  excerpt: string
  paragraphs: string[]
  content: string
  path: string
  author: Author
  featured_media: FeaturedMedia
}
