// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Form, BooleanField, CharField, ChoiceField } from 'react-common';

class ExampleForm extends Form {
  constructor(data?: Object = {}) {
    super(data);
  }

// Fields that will be included in this form
  static fields = [
    [BooleanField, { name: 'BooleanField', label: 'BooleanField in SubField', required: false }],
    [CharField, { name: 'CharField', label: 'CharField in SubField', required: false }],
    [ChoiceField, {
      name: 'ChoiceField',
      label: 'ChoiceField in SubField',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    }],
  ];
}


export default class CommonExample extends React.Component {
  render() {
    const form = new ExampleForm();
    return (
      <div style={{ background: '#eeeeee' }}>
        <Button icon="download" label="Download" accent />
        <div>
          <form id="form">
            <section>
              <div>{ form.fields.BooleanField.render() }</div>
              <div>{ form.fields.ChoiceField.render() }</div>
              <div>{ form.fields.CharField.render() }</div>
            </section>
          </form>
        </div>
      </div>
    );
  }
}
