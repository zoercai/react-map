import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-toolbox/lib/button';
import API from '../../api';

@inject('counterStore')
@observer
class CounterSave extends Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }

  save() {
    API.saveFile(this.props.counterStore.saveFile);
  }

  load() {
    return API.getSaveFile().then((saveFile) => {
      this.props.counterStore.loadSaveFile(saveFile);
    });
  }

  render() {
    const buttonStyle = {
      color: 'white',
      fontWeight: '700',
    };
    return (
      <div>
        <Button id="save" onClick={this.save} label="Save" style={buttonStyle} />
        <Button id="load" onClick={this.load} label="Load" style={buttonStyle} />
      </div>
    );
  }
}

export default CounterSave;
