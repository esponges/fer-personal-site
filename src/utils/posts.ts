import type { Post } from '~/types';

type PostFetchError = {
  error: string;
  status: number;
};

export const getPosts = async () => {
  const url = 'https://dev.to/api/articles?username=esponges';

  try {
    const res = await fetch(url);
    const posts = (await res.json()) as Post[] | PostFetchError;

    if (Array.isArray(posts)) {
      // order the posts by positive_reactions_count
      return posts.sort((a, b) => b.positive_reactions_count - a.positive_reactions_count) as Post[];
    } else {
      return null;
    }

  } catch (error) {
    return null;
  }
};

export const getPostDetails = async (id: string) => {
  const url = `https://dev.to/api/articles/${id}`;

  try {
    const res = await fetch(url);
    const post = (await res.json()) as Post<true> | PostFetchError;
  
    if (Array.isArray(post)) {
      return post as Post<true>;
    } else {
      return null;
    } 
  } catch (error) {
    return null;
  }
}
