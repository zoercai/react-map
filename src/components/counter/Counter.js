import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';
import Store from '../../store';
import CounterDisplay from './CounterDisplay';

@observer
class Counter extends Component {
  increment() {
    Store.increment(1);
  }

  decrement() {
    Store.decrement(1);
  }
  render() {
    return (
      <Card style={{ width: '350px', marginTop: '2em' }}>
        <CardTitle title="Counter" />
        <CardText>
          <CounterDisplay count={Store.count} />
          <div id="increments">increments: {Store.increments}</div>
          <div id="decrements">decrements: {Store.decrements}</div>
        </CardText>
        <CardActions>
          <IconButton id="increment" icon="add" onClick={this.increment} />
          <IconButton id="decrement" icon="remove" onClick={this.decrement} />
        </CardActions>
      </Card>
    );
  }
}

export default Counter;
