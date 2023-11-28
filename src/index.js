import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import 'icheck/skins/all.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { DialogContextWrapper } from './ContextProvider/DialogContext';


ReactDOM.render(
  // <React.StrictMode>
  <HashRouter>
    <DialogContextWrapper>
      <App />
    </DialogContextWrapper>
  </HashRouter>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
