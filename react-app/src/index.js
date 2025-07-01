import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Provider>
  </React.StrictMode>
);


/*ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


