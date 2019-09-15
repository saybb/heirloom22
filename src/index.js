import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase, reduxFirebase } from 'react-redux-firebase'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import rootReducer from './store/Reducer/rootReducer'
import config, {auth, firestore} from './firebase/config'
import 'antd/dist/antd.css';

const store = createStore(rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({auth, firestore})),
      reactReduxFirebase(config, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}, logger),
      reduxFirestore(config) // redux bindings for firestore
    )
  );
  
  store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA

    serviceWorker.unregister();
  });