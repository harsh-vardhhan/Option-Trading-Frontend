import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'overmind-react';
import {createOvermind} from 'overmind';
import {config} from './overmind';

const rootEl = document.getElementById('root');

export const overmind = createOvermind(config, {devtools: true});
ReactDOM.render(
    <Provider value={overmind}>
        <App/>
    </Provider>,
    rootEl);
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp/>, rootEl);
    });
}
