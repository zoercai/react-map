import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';
import CounterDisplay from './CounterDisplay';

@inject('counterStore')
@observer
class Counter extends Component {
  increment = () => {
    this.props.counterStore.increment(1);
  }

  decrement = () => {
    this.props.counterStore.decrement(1);
  }
  render() {
    return (
      <Card style={{ width: '350px', marginTop: '2em' }}>
        <CardTitle title="Counter" />
        <CardText>
          <CounterDisplay count={this.props.counterStore.count} />
          <div id="increments">increments: {this.props.counterStore.increments}</div>
          <div id="decrements">decrements: {this.props.counterStore.decrements}</div>
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
