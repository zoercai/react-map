import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-toolbox/lib/button';
import Store from '../../store';
import API from '../../api';

@observer
class CounterSave extends Component {
  save() {
    API.saveFile(Store.saveFile);
  }

  load() {
    return API.getSaveFile().then((saveFile) => {
      Store.loadSaveFile(saveFile);
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
