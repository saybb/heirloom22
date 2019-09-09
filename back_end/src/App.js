import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/configureStore';

/* Components */
import Navigation from "./Navigation.js";
import ArtefactList from "./feed/ArtefactList.js";
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';

const store = ConfigureStore();

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = ({`
  //     user: null,
  //   });
    
  // }

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div><h1>Heirloom22 Title Here</h1></div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={ArtefactList} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
