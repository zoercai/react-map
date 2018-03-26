// @flow
/* eslint no-param-reassign: ["error", { "props": false }] */
import React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { extendObservable, computed, isObservableArray, observable, action } from 'mobx';
import { MultipleChoiceWidget, ValidationError } from 'react-common';
import type Form from 'react-common';

export function isArray(v: any) {
  return Array.isArray(v) || isObservableArray(v);
}

export class Field {
  form: Form; // The form this field belongs to
  name: string; // key of the value in the form data
  widget: Function; // A bound function returning a react component
  validators: Array<Function>; // Array of validators

  // Bound handlers
  handleBlur: Function;
  handleChange: Function;
  handleFocus: Function;
  handleKeyPress: Function;

  // Due to the implementation of class in ES6, this.foo = bar happens after
  //  the constructor of parent class, thus all properties getting accessed
  //  in parent constructor should be defined as static property.
  static validators: Array<Function> = []; // base validators
  static widget: Function = () => {}; // default widget renders nothing

  // observable
  // TODO Document, espeically about the purity of the computed functions,
  //  which means no variables other than observables should be accessed inside these functions.
  //  Otherwise the functions will yield the cached value as the initial one,
  //  This behaviour might not be expected.
  active: boolean; // Whether this field gets displayed and validated in the form
  label: string;
  required: boolean;
  disabled: boolean;
  showError: boolean;
  initial: any;
  $value: any;
  validateOnChange: boolean;
  @observable $errors = [];

  constructor({ name, validators = [], widget,
    handleBlur, handleChange, handleFocus, handleKeyPress,
    active = true, label, required = true, disabled = false, initial, validateOnChange = false,
  }: Object) {
    Object.assign(this, {
      name,
      validators: [...this.constructor.validators, ...validators],
      // Convert the widget into observer component to improve the performance
      //  After this, we should render the widget through <this.widget /> or React.createElement()
      //  otherthan this.widget() call.
      widget: observer((widget || this.constructor.widget).bind(this)),
      handleBlur: (handleBlur || this.handleBlur).bind(this),
      handleChange: (handleChange || this.handleChange).bind(this),
      handleFocus: (handleFocus || this.handleFocus).bind(this),
      handleKeyPress: (handleKeyPress || this.handleKeyPress).bind(this),
    });
    extendObservable(this, { active, label, required, disabled, initial, validateOnChange });
  }

  handleChange(v: any) {
    this.value = v;
    // setTimeout can be applied here
  }
  handleBlur() {
    this.clean();
  }
  handleFocus() {}
  handleKeyPress() {}

  // Doing the binding with input data
  initializeValue(data: Object) {
    const v = data[this.name];
    let $value = this.normalize(v);
    if ((this.isEmpty(v) || this.isEmpty($value)) && this.initial) {
      $value = this.normalize(this.initial);
    }
    extendObservable(this, { $value });
  }

  @computed
  get value(): any {
    return this.$value;
  }

  set value(v) {
    this.$value = this.normalize(v);
    if (this.validateOnChange) {
      this.clean();
    }
  }

  // Called during the retrieving of the entire form value
  fillValue(root: Object) {
    root[this.name] = this.value;
  }

  get id() {
    return this.name;
  }

  // Following are treating as empty value:
  //  undefined, null, '', [], {}, empty objects
  isEmpty(v: any): boolean {
    if (v instanceof Date) {
      return false;
    }
    return (
      (v === undefined) ||
      (v === null) ||
      (v === '') ||
      (typeof v === 'object' && _.isEmpty(v))
    );
  }

  @computed
  get errors() {
    return this.$errors.slice();
  }


  set errors(v) {
    this.$errors.replace(v || []);
  }

  setErrors(v: Object) {
    this.errors = v ? v[this.name] : [];
  }

  @computed
  get flatErrors() {
    return this.errors;
  }

  // TODO api errors
  // Errors structure
  // single field: [e1, e2, ...]
  // subfield: { f1: [e1, e2, ...], ...}
  // listfield: [{ f1: [e1, e2, ...], ...}, ...]
  // Every field knows its own client error, need a way to dispatch api error to fields
  clean(updateValidateOnChange = true): boolean {
    const errors = [];
    try {
      this.validate(this.value);
      this.runValidators(this.value);
    } catch (e) {
      if (e instanceof ValidationError) {
        errors.push(...e.message);
      } else {
        throw e;
      }
    }
    // TODO Find a right place for this one for customization
    if (updateValidateOnChange) {
      // When clean is invoked, update errors completely, which overrides server errors set before
      this.errors = errors;
      // Enable the auto validation when being cleaned
      action(() => { this.validateOnChange = true; });
    }
    return errors.length === 0;
  }

  // Normalize the data to the right type and value (possibly empty).
  normalize(v: any) {
    return v;
  }

  validate(value: any) {
    // If the field is required but unfilled, fail validation ASAP before doing other validations
    // TODO Customizable message
    if (this.required && this.isEmpty(value)) {
      throw new ValidationError([`${this.label} is required.`]);
    }
  }

  runValidators(value: any) {
    if (this.isEmpty(value)) {
      return;
    }
    let errors = [];
    for (const v of this.validators) {
      try {
        v(value, this);
      } catch (e) {
        if (e instanceof ValidationError) {
          errors = [...errors, ...e.message];
        } else {
          throw e;
        }
      }
    }
    if (errors.length) {
      throw new ValidationError(errors);
    }
  }

  render(props?: Object) {
    return this.active && <this.widget {...props} />;
  }

  cleanOptions(options: any): Array<{label: string, value: any}> {
    if (!isArray(options) || this.isEmpty(options)) {
      return [];
    }
    return options.map((item) => {
      if (typeof item === 'string') {
        return { label: item, value: item };
      } else if (isArray(item)) {
        // TODO Refactor this little bit messy
        return { label: item[1], value: item[0] };
      }
      return item;
    });
  }
}

export class MultipleChoiceAntdField extends Field {
  static widget = MultipleChoiceWidget;
  $options: any;

  constructor({ options, ...params }: Object) {
    super(params);
    extendObservable(this, { $options: options });
  }

  @computed
  get options(): { [key: string]: string } {
    const ret = {};
    for (const option of this.cleanOptions(this.$options)) {
      ret[option.value] = option.label;
    }
    return ret;
  }

  @computed
  get value(): Array<string> {
    // this.$value.peek() does not work well here
    return this.$value.slice();
  }

  set value(v) {
    this.$value.replace(this.normalize(v));
    if (this.validateOnChange) {
      this.clean();
    }
  }

  normalize(seq: any): Array<string> {
    if (!isArray(seq) || this.isEmpty(seq)) {
      return [];
    }
    return seq.filter(v => v in this.options);
  }

  // Semi-Fuzzy search
  filterOption(inputValue, option) {
    return option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}

// Can be rendered as autocomplete or checkbox
export class GroupedMultipleChoiceAntdField extends Field {
  static widget = MultipleChoiceWidget;
  $options: any;

  constructor({ options, ...params }: Object) {
    super(params);
    extendObservable(this, { $options: options });
  }

  initializeValue(data: Object) {
    let v = [];
    if (data.machineIds !== null && data.machineIds !== undefined) {
      if (data.groupIds !== null && data.groupIds !== undefined) {
        v = data.machineIds.concat(data.groupIds);
      } else {
        v = data.machineIds.concat(data.fleetIds);
      }
    }
    let $value = this.normalize(v);
    if ((this.isEmpty(v) || this.isEmpty($value)) && this.initial) {
      $value = this.normalize(this.initial);
    }
    extendObservable(this, { $value });
  }

  @computed
  get options() {
    const ret = this.cleanOptions(this.$options);
    return ret;
  }

  @computed
  get value(): Array<Object> {
    // this.$value.peek() does not work well here
    return this.$value.slice();
  }

  cleanOptions(options: any): Array<{label: string, value: any, type: string}> {
    if (!isArray(options) || this.isEmpty(options)) {
      return [];
    }
    return options.map((item) => {
      if (typeof item === 'string') {
        return { label: item, value: item };
      } else if (isArray(item)) {
        // TODO Refactor this little bit messy
        return { label: item[1], value: item[0] };
      }
      return item;
    });
  }

  set value(v) {
    this.$value = v;
  }

  handleChange(value) {
    const values = [];
    value.forEach((v) => {
      this.options.forEach((option) => {
        if (v === option.value) {
          values.push(option);
        }
      });
    });
    this.value = values;
  }

  // Semi-Fuzzy search
  filterOption(inputValue, option) {
    return option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }

  normalize(seq) {
    if (!isArray(seq) || this.isEmpty(seq)) {
      return [];
    }

    return this.options.filter(option =>
      seq.indexOf(option.value) !== -1);
  }
}
