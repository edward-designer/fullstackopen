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
package.json
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
*/
