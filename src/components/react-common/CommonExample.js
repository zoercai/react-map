// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import ExampleForm from './ExampleForm';


export default class CommonExample extends React.Component {
  form = new ExampleForm();
  render() {
    return (
      <div style={{ background: '#eeeeee' }}>
        <Button icon="download" label="Download" accent />
        <div>
          <form id="form">
            <section>
              <div>{this.form.fields.BooleanField.render()}</div>
              <div>{this.form.fields.ChoiceField.render()}</div>
              <div>{this.form.fields.CharField.render()}</div>
            </section>
          </form>
        </div>
      </div>
    );
  }
}
