import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


/* react testing
    npm install --save-dev @testing-library/react @testing-library/jest-dom
    npm install --save-dev @testing-library/user-event   //simulate click events

    End to end testing
    npm install --save-dev cypress
    package.json add scripts "cypress:open": "cypress open"
    //need to start the servers before testing
    npm install eslint-plugin-cypress --save-dev
    .eslintrc.js
    module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [
      // ...
    ],
    "parserOptions": {
      // ...
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
      // ...
    }
}

*/