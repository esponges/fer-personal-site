export interface Post {
  // dev.to API response
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string;
  crossposted_at: string;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
}

export interface Image {
  url: string;
  alt: string;
  title?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

interface Lib {
  name: string;
  url: string;
}

export interface Project {
  name: string;
  subheader?: string;
  description?: string;
  tags: string;
  url?: string;
  images: Image[];
  libs: Lib[];
};
