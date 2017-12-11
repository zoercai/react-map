// @flow
import { Form, BooleanField, CharField, ChoiceField } from 'react-common';

export default class ExampleForm extends Form {
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
