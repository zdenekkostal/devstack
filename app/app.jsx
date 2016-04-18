import './styles/app';

import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button';

ReactDOM.render(
    <Button value="Hello world" />,
    document.getElementById('app')
);

if (DEBUG) {
    console.log('dev');
} else {
    console.log('production');
}
