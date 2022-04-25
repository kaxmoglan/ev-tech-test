# Feature Flag Test Instructions

## Prerequisites

You must have `Docker` and `docker-compose` installed.

## Set up the project & database

1. Run `yarn install` to install required modules.
2. Run `yarn run db`. This will spin up the Postgres Docker container.
3. Run `yarn run db:migrate`. This will use Prisma to sync the database with the schema.
4. Run `yarn run db:seed`. This will populate the database with the users set out in `./backend/prisma/test_users.json`.

## Run the project

- `yarn run be` to start the back-end server
- `yarn run fe` to start the front-end development server
- `yarn run test` to run all front-end and back-end tests
