import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import PlacesReducer from './store/places/reducer'
import {init} from './helpers/db'
// initializing the database
init().then(()=>{
  console.log('database initialized');
}).catch((error)=>{
  console.log('Database initialization failed');
  console.log(error);
});

const rootReducer = combineReducers({
  places:PlacesReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
