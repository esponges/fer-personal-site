# DB 

For local development you can local postgress. To create the database:

- install postgres using homebrew `brew install postgresql`
- allow postgres to start on boot `pg_ctl -D /usr/local/var/the_full_postgres_folder_name start && brew services start postgresql`
- check the version `postgres --version`
- if you wish you can create a new user https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb#a-creating-users
or you can use the SU (locally only!)
- get into the postgres cli `psql postgres`
- check users `postgres=# \du`
- create a db `postgres=# CREATE DATABASE fer_site;`
- get the connection string details `postgres=# \conninfo`
- add your connection string to the `DATABASE_URL` environment variable, it will look something like this `postgres://postgresUserName:passwordIfAnyOrEmpty@localhost:5432/fer_site`
- run `npx prisma db push` to create the database schema
- seed with `npx prisma db seed` (optional)

For production you can use postgres. To create the database:

- create a postgres database
- add your connection string to the `DATABASE_URL` environment variable
- run `npx prisma db push` to create the database schema
- seed with `npx prisma db seed` (optional)
- update the schema with the migrations generated in dev (see seed.ts comments and below).

To migrate the database:

- Change your prisma .env file to local db
- Delete prisma/migrations folder
- Run npx prisma migrate dev --preview-feature to start a new migration
- Change your prisma .env file back to development db
- Run npx prisma migrate resolve --applied "MIGRATION_FOLDER_NAME_GENERATED_BY_STEP_4"  --preview-feature

seen in: https://github.com/prisma/prisma/issues/4571#issuecomment-747496127

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
# fer-personal-site

# Migration to App directory

Left the migration in the `app-dir-migrate-test` branch for reference but had to quit since GSSP is not supported by the app directory
and TPRC would also be killed which something I cannot accept for the moment.
