import React from 'react';
import './index.css';
import AppRedux from "./AppRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";





const container = document.getElementById ( 'root' ) as HTMLElement
const root = createRoot ( container );
root.render (
    <Provider store={store}>
        <AppRedux/>
    </Provider>


);


