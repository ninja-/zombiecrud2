1. cp .env.example .env
2. fill up your database details
3. yarn start setup

run dev server: yarn start serve
run api tests: NODE_ENV=test yarn run jest --testPathPattern=e2e -i

Api is on /api, for example GET /api/zombies

To view the documentation SWAG go to /swag

NOTES:
- I know there is some boilerplate of User and Pet left; I left some(but not all) in case I needed to lookup some code patterns; also it was very heavily integrated everywhere