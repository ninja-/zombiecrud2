Zombie CRUD 2.0
------

How to run:
1. cp .env.example .env
2. fill up your MYSQL database details in .env
3. yarn start setup

run dev server: yarn start serve

How to run tests:
- $ cp .env.test.example .env.test
- fill mysql database details in .env.test
- $ NODE_ENV=test yarn run jest --testPathPattern=e2e -i

(not sure what's wrong with `yarn run test.e2e`, but doesn't run the tests at all)

Api is on /api, for example GET /api/zombies

To view the documentation SWAG go to /swag

NOTES:
- I know there is some boilerplate of User and Pet left; I left some(but not all) in case I needed to lookup some code patterns; also it was very heavily integrated everywhere
- sqlite is not supported, only mysql; there are some schema issues.
- to run tests use seperate mysql database, then your data will not be deleted