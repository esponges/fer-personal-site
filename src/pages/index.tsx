import { type NextPage } from "next";
import Head from "next/head";

import { PageHeader } from "~/components/atoms/pageHeader";
import { MeCard } from "~/components/molecules/meCard";
import { Emojis } from "~/types/enums";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fer Tostado</title>
        <meta name="description" content="Fer Tostado's Personal site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <PageHeader
          title={`Hello ${Emojis.hi}, I'm Fernando `}
          description=""
        />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <MeCard
              emoji={Emojis.me}
              description={`I'm a software engineer from Guadalajara, Mexico. ${Emojis.mexico}
              . I've been coding since 2019.`}
            />
            <MeCard
              emoji={Emojis.code}
              description="My current stack is React, Next.js, 
              MySql/Mongo/Postgres, TypeScript, TailwindCSS, and Prisma. 
              With a sprinkle of Electron and Node.js."
            />
            <MeCard
              emoji={Emojis.heart}
              description={`My passion is to create software that helps people. 
              I love to learn new things and share what I know. 
              I also love reading ${Emojis.book} and sports ${Emojis.gym}.`}
            />
            <MeCard
              emoji={Emojis.love}
              description={`I'm happily married to my wife Vicky ${Emojis.her}. 
              I'm also a proud dog dad of two ${Emojis.dog}${Emojis.dog}.`}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
