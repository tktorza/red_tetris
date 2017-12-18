import { render } from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import React from 'react';
import './index.css';
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// registerServiceWorker();

const store = createStore(reducer,
    composeEnhancers(
        applyMiddleware(
            //   socketIoMiddleWare(socket),
            thunk
        )))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)