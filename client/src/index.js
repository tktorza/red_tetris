import { render } from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers/Action'
import React from 'react';
import './index.css';
import thunk from 'redux-thunk'
import socketMiddleware from './middleware/socketMiddleware'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// registerServiceWorker();

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            socketMiddleware
        )))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

export default store
