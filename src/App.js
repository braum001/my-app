import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
// import logo from './logo.svg';
import Home from './views/Home';
import About from './views/About';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="test">
        <HashRouter>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route component={About} path="/About" />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}




export default App;
