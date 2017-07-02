import React, { Component } from 'react';
import { PINK, BLUE } from '../../constants';

class CounterDisplay extends Component {
  static propTypes = {
    count: React.PropTypes.number,
  }

  static defaultProps = {
    count: 0,
  }

  state = {
    active: false,
  }

  style() {
    let color = PINK;
    if (this.state.active) {
      color = BLUE;
    }
    return {
      color,
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '3em',
      userSelect: 'none',
      cursor: 'default',
    };
  }

  toggleActive = () => {
    this.setState(state => ({
      active: !state.active,
    }));
  };

  render() {
    return (
      <div style={this.style()} onClick={this.toggleActive}>
        <span id="count">{this.props.count}</span>
      </div>
    );
  }
}

export default CounterDisplay;
