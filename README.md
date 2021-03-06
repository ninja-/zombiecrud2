Zombie CRUD 2.0
------

This was a 24h recruitment project.
The project's goal was to demonstrate good integratiation with external API as well as some modern code patterns and libraries.

How to run:
1. $ cp .env.example .env
2. fill up your MYSQL database details in .env
3. $ yarn start setup
4. $ yarn start serve
5. go to localhost:3000

How to run tests:
- $ cp .env.test.example .env.test
- fill mysql database details in .env.test
- $ NODE_ENV=test yarn run jest --testPathPattern=e2e -i

(not sure what's wrong with `yarn run test.e2e`, but it doesn't run the tests at all)

Api is on /api, for example GET /api/zombies

To view the documentation SWAG go to /swag

NOTES:
-----
- I know there is some boilerplate of User and Pet left; I left some(but not all) in case I needed to lookup some code patterns; also it was very heavily integrated everywhere
- sqlite is not supported, only mysql; there are some schema issues.
- to run tests use seperate mysql database, then your data will not be deleted
- looks like dependencies fail to compile on node 12.x; stick to node 8/10
Test results:
```
 PASS  test/e2e/api/zombies.test.ts (15.199s)
```
