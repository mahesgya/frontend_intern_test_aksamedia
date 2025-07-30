import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './context/store';
import './index.css'
import App from './app';

const container = document.getElementById("root");

if(!container){
  throw new Error('Container tidak ditemukan.');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

