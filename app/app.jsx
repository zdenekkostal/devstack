import './styles/app';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Button from './components/button/button.jsx';

ReactDOM.render(
    <AppContainer
        component={Button}
        props={{
            value: 'Hello world'
        }}
    />,
    document.getElementById('app')
);

if (DEBUG && module.hot) {
    module.hot.accept('./components/button/button.jsx', () => {
        ReactDOM.render(
            <AppContainer
                component={require('./components/button/button.jsx').default}
                props={{
                    value: 'Hello world'
                }}
            />,
            document.getElementById('app')
        );
    });
}
