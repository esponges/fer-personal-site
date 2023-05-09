/* this is an svg skeleton to use in the suspense for RSC pages */

import ContentLoader from 'react-content-loader';

// see more layouts in https://skeletonreact.com/

export function PageSkeleton() {
  return (
    <ContentLoader
      speed={12}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className='w-full h-full mx-auto'
      /* {...props} */
    >
      <circle
        cx="31"
        cy="31"
        r="15"
      />
      <rect
        x="58"
        y="18"
        rx="2"
        ry="2"
        width="140"
        height="10"
      />
      <rect
        x="58"
        y="34"
        rx="2"
        ry="2"
        width="140"
        height="10"
      />
      <rect
        x="0"
        y="60"
        rx="2"
        ry="2"
        width="400"
        height="400"
      />
    </ContentLoader>
  );
}
