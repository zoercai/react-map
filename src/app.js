import React from 'react';
import { observer, Provider } from 'mobx-react';
import { styles } from 'react-common';
import { Layout } from 'react-toolbox';
import Store from './store';
import Main from './components/main/Main';

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
      store.getOnPointsAction(),
      store.getOffPointsAction(),
    ]).then(() => {
      this.setState({ loaded: true });
    },
    ).catch(() => {
      this.setState({ error: true });
    });
  }

  renderView() {
    return !this.state.loaded ?
      (<div id="pos-loading" className={styles.loading} key={0}>
        <div>
          <span>Loading your proof of service data</span>
          <span className={styles.bar} />
        </div>
      </div>) :
      (<Provider store={store}>
        <Layout>
          <Main />
        </Layout>
      </Provider>);
  }

  render() {
    return this.state.error ?
      (<div className={styles.loading} key={1}>
        <div>
          <span>An error occurred while loading your proof of service data</span>
          <span>Please try again later</span>
        </div>
      </div>) :
      this.renderView();
  }
}

export default App;
