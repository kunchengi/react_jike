import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import '@/index.scss';
import store from '@/store';
import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
// React.StrictMode会使组件渲染两次
root.render(
  // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  // </React.StrictMode>
);
