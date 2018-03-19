import React from 'react';
import { observer, Provider } from 'mobx-react';
import Store from './store';
import Map from './components/Map';

const store = new Store();

@observer
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      error: false,
    };
  }

  componentWillMount() {
    Promise.all([
      store.getTripsAction(),
      store.getEventsAction(),
    ]).then(() => {
      this.setState({ loaded: true });
    },
    ).catch(() => {
      this.setState({ error: true });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Map />
      </Provider>
    );
  }
}

export default App;
