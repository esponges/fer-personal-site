import Image from 'next/image';
import { PageHeader } from '~/components/atoms/pageHeader';
import { MeCard } from '~/components/molecules/meCard';
import { Container } from '~/components/organisms/container';
import { Emojis } from '~/types/enums';
import { generateMetadata } from './defaultMetadata';

export const metadata = await generateMetadata();

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Container>
        <PageHeader
          title={`Hello ${Emojis.hi}, I'm Fernando `}
          description=""
        />
        <Image
          className="mx-auto rounded-xl
            border-2 border-4 border-gray-200"
          src="/images/me.png"
          alt="Fernando Tostado"
          width={200}
          height={200}
        />
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
    </div>
  );
}
