/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Post } from '~/types';

export const getPosts = async (): Promise<(Post)[] | null> => {
  const url = 'https://dev.to/api/articles?username=esponges';

  try {
    const res = await fetch(url);
    const posts = (await res.json());

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

export const getPostDetails = async (id: string): Promise<(Post<true>) | null> => {
  const url = `https://dev.to/api/articles/${id}`;

  try {
    const res = await fetch(url);
    const post = (await res.json());
  
    if (post.id) {
      return post as Post<true>;
    } else {
      return null;
    }
    
  } catch (error) {
    return null;
  }
};
