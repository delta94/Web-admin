import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import './styles/theme/theme.style.css';
import './styles/stt_page.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './locales/i18n';
import { Provider } from 'react-redux';
import { App } from 'app';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';
import { BrowserRouter } from 'react-router-dom';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;
interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <BrowserRouter>
    <Provider store={store}>
      <HelmetProvider>
        <Component />
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
);

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

serviceWorker.unregister();
