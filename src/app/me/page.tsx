import Home from "~/app/page";
import { generateMetadata } from "~/app/defaultMetadata";

export const metadata = await generateMetadata();

/* 
  this route is a temporary redirect to the home page
  this was required since there's a bug in next.js that
  makes the home page reload when you navigate to it
  https://github.com/vercel/next.js/issues/51306
*/

export default Home;
