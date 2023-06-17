import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import IndexRoute from "./routes/IndexRoute";
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
        <Provider store={store}>
            <BrowserRouter>
                <IndexRoute />
            </BrowserRouter>
        </Provider>
    </>
  );
}

export default App;
