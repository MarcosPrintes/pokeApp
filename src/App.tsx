import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import Routes from './routes';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#debd29" />
      <Routes />
    </Provider>
  );
};

export default App;
