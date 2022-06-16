import React from 'react';
import ReactDOM from 'react-dom/client'

import App from './app'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer/vote.reducer'

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)