import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import { EventProvider } from './context/EventContext';

function App() {
  return (
    <EventProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/event/:id" component={EventDetail} />
        </Switch>
      </Router>
    </EventProvider>
  );
}

export default App;
