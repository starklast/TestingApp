import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes/';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact
              component={item.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
