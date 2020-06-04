import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
// import logo from './logo.svg';
import Login from './views/Login/index';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="test">
        <HashRouter>
          <Switch>
            <Route exact component={Login} path="/" />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}




export default App;
