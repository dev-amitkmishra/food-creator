import React, { Component } from 'react';
import Aux from './hoc/_aux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </Aux>
    );
  }
}

export default App;
