const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

/*
npm init
npm install
    express
    nodemon --save-dev
    cors
    eslint --save-dev (npx eslint --init)
    dotenv (plus create .env at root)
    mongoose
    jest --save-dev
        npm test -- -t "a specific note is within the returned notes"
        npm test -- tests/note_api.test.js
    supertest --save-dev
    * mongodb-memory-server for mocking mongodb
package.json
    "scripts": {
        "start": "NODE_ENV=production node index.js",
        "dev": "NODE_ENV=development nodemon index.js",
        "test": "NODE_ENV=test jest --verbose --runInBand --forceExit", // --runInBand prevent Jest from running tests in parallel, --forceExit mongoose doesn't play well with jest for async tests
    }
*/
