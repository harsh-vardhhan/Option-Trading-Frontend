import React from 'react';
import {ErrorBoundary} from './components';
import Routes from './Routes';
import AuthProvider from './context/authContext';
import 'antd/dist/antd.css';

import {config} from './overmind';

export default function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </ErrorBoundary>
    );
}

