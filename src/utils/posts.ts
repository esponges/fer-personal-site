import type { Post } from '~/types';

export const getPosts = async () => {
  const url = 'https://dev.to/api/articles?username=esponges';

  const res = await fetch(url);
  const posts = (await res.json()) as Post[];

  // order the posts by positive_reactions_count
  return posts.sort((a, b) => b.positive_reactions_count - a.positive_reactions_count);
};