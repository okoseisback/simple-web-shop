# Simple Web Shop

This project is a simple web shop powered by **OKTAY KÖSE** (okoseisback@gmail.com).

## Available Scripts

For development purposes, you can use the following npm scripts:
** The `npm run` command must be in front before running the commands. Ex: `npm run dev`
** For local use, change .env.example to .env and define the values correctly.

In the project directory, you can run:

### `dev`

Runs the project in development mode. It watches for code changes and automatically restarts the server. It uses `pino-pretty` to make the output more readable.

### `build`

Builds the project for production. It first cleans the `dist/` folder, then compiles TypeScript code to JavaScript using `tsc`. It also runs the `copyAssets` script using `ts-node` and `tsconfig-paths`.

### `start`

Runs the compiled production code.

### `test`

Launches the Jest test runner.

### `test:cov`

Reports code coverage and watches all tests.

### `test:watch`

Watches all tests and reruns them on changes.

### `db:mig:init`

Initializes database migration and saves it with a name `init`.

### `db:mig:deploy`

Deploys database migration.

### `db:mig:reset`

Resets the database and rolls back all database migrations.

### `db:gen`

Regenerates Prisma models and CRUD operations.

### `db:push`

Pushes the database schema and migrations to the database.

### `db:seed`

Runs a script to seed the database with sample data.

### `lint`

Lints all TypeScript files using `eslint`.

### `lint:fix`

Automatically fixes `eslint` errors in all TypeScript files.


## Installation and Setup

### `npm i`

Installs project dependencies.

### `npm run db:gen`

Generates Prisma models and CRUD operations.

### `npm run db:mig:deploy`

Deploys database migration.

### `npm run db:seed`

Runs database seeding.

### `npm run dev`

Starts the server in development mode with hot reloading.


## Start for Docker

### `docker-compose up -d`

Starts the application container in detached mode.

### `docker exec -it sws_app npm run db:mig:deploy`

Executes database migration within the running container.

### `docker exec -it sws_app npm run db:seed`

Executes database seeding within the running container.

** The application listens on port :3000 unless stated otherwise.

## Technologies Used

- **PostgreSQL**: Powerful relational database management system.
- **Express.js**: Web framework for Node.js.
- **Prisma**: ORM for TypeScript and Node.js.
- **Zod**: TypeScript-first schema declaration and validation library.
- And more.

## License

This project is licensed under the ISC License.