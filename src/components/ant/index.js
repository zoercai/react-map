// @flow
import React from 'react';
import { AutoComplete } from 'antd';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

function Complete() {
  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );
}

export default class AntExample extends React.Component {
  render() {
    return (
      <div style={{ background: '#eeeeee' }}>
        <Complete />
      </div>
    );
  }
}
