import React from 'react';
import './index.css';
import {store} from "redux/store";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {App} from "features/app/ui/App";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);


