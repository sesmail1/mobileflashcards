import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import AppNavigation from './components/tabs/Navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { deck_reducer } from './redux/reducers/reducers';
import { setLocalNotification} from './utils/asyncStorageMethods'


const store = createStore(deck_reducer, applyMiddleware(thunk, logger));

export default class App extends React.Component {
  componentDidMount() {
      setLocalNotification();
  }
  render() {
    return (
        <Provider store={store}>
          <AppNavigation/>
        </Provider>
    );
  }
}

