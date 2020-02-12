import React from 'react';
import {ErrorBoundary} from './components';
import Routes from './Routes';
import 'antd/dist/antd.css';

export default function App() {
    return (
        <ErrorBoundary>
            <Routes/>
        </ErrorBoundary>
    );
}

