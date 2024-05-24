import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback="loading">
          <App />
        </Suspense>
      </I18nextProvider>
    </PersistGate>
  </Provider>
)
