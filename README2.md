1. cp .env.example .env
2. fill up your database details
3. yarn start setup

run dev server: yarn start serve
run api tests: NODE_ENV=test yarn run jest --testPathPattern=e2e -i

Api is on /api, for example GET /api/zombies

To view the documentation SWAG go to /swag