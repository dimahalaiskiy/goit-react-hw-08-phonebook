import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { OuterLayout } from './Components/NavBar/NavBar.styled';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OuterLayout>
          <App />
        </OuterLayout>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
