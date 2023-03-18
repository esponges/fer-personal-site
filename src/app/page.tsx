// import { IKImage } from "imagekitio-react";
import { PageHeader } from "~/components/atoms/pageHeader";
import { MeCard } from "~/components/molecules/meCard";
import { Container } from "~/components/organisms/container";
// import { env } from "~/env/client.mjs";
import { Emojis } from "~/types/enums";

export default function Home () {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <Container>
          <PageHeader
            title={`Hello ${Emojis.hi}, I'm Fernando `}
            description=""
          />
          {/* <IKImage
            className="mx-auto h-36 rounded-full 
            border-2 border-4 border-gray-200"
            urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL}
            path="me_jL4sB97lr?ik-sdk-version=javascript-1.4.3&updatedAt=1672787403219"
          /> */}
          <div className="container flex flex-col items-center justify-center gap-12 py-16 ">
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
        </Container>
      </main>
    </>
  );
};
