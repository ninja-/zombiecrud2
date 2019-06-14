Zombie CRUD 2.0
------

How to run:
1. cp .env.example .env
2. fill up your database details in .env and .env.test(if you want to run tests)
3. use a seperate mysql database for .env.test
4. yarn start setup

run dev server: yarn start serve
run api tests: NODE_ENV=test yarn run jest --testPathPattern=e2e -i

(not sure what's wrong with yarn run test.e2e, but doesn't run the tests at all)

Api is on /api, for example GET /api/zombies

To view the documentation SWAG go to /swag

NOTES:
- I know there is some boilerplate of User and Pet left; I left some(but not all) in case I needed to lookup some code patterns; also it was very heavily integrated everywhere
- sqlite is not supported, only mysql; there are some schema issues.
- to run tests use seperate mysql database, then your data will not be deleted