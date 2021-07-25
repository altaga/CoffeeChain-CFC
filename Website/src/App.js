// Basic
import { Component } from "react";

// Router
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Main from "./pages/main";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="*" component={Main} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
