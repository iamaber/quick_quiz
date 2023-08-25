import React from 'react';
import { createRoot } from 'react-dom'; // Corrected import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css'; // for antd components 
import store from "./redux/store";
import { Provider } from "react-redux"; 

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
