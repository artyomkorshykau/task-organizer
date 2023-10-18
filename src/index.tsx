import React from 'react';
import './index.css';
import App from "./app/App";
import {store} from "./app/store";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";

const container = document.getElementById ( 'root' ) as HTMLElement
const root = createRoot ( container );
root.render (
    <Provider store={store}>
        <App/>
    </Provider>


);


