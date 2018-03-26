// @flow
import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Button } from 'react-toolbox/lib/button';
import { Select } from 'antd';
import cn from 'classnames';
import styles from './styles.css';

const { Option, OptGroup } = Select;

// Widgets are bound to field in the constructor of the field, then are made as observer
export function ButtonWidget() {
  const value = this.value === null || this.value === undefined || this.value.length === 0 || (this.value.indexOf('PRE_TRIP') !== -1 && this.value.indexOf('POST_TRIP') !== -1) ? ['ALL'] : this.value;
  return (
    <div className={styles.border}>
      {
        Object.keys(this.options).map(key =>
          <Button theme={{ button: styles.buttonTheme }} key={key} label={this.options[key]} value={key} ripple={false} className={cn(styles.buttonBorder, (value.indexOf(key) !== -1 ? styles.buttonActive : styles.button))} onClick={() => this.handleChange([key])} />,
        )
      }
    </div>
  );
}

export function MultipleCheckboxWidget() {
  return (
    <div className={styles.checkBoxContainer}>
      {
        Object.keys(this.options).map(key =>
          (<div className={styles.checkBoxSubContainer}>
            <Checkbox
              key={key}
              value={key}
              label={this.options[key]}
              className={styles.checkBox}
              theme={{ text: styles.checkBoxText, checked: styles.checked, check: styles.check }}
              onChange={() => {
                const index = this.value.indexOf(key);
                if (index !== -1) {
                  this.value.splice(index, 1);
                  this.handleChange(this.value);
                } else {
                  this.handleChange(this.value.concat(key));
                }
              }}
              checked={this.value.indexOf(key) !== -1}
              name={this.name}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              disabled={this.disabled}
            />
          </div>),
        )
      }
    </div>
  );
}

export function MultipleChoiceAntdWidget() {
  return (
    <Select
      mode="multiple"
      className={styles.antdSelect}
      placeholder={this.label}
      onChange={this.handleChange}
      notFoundContent="None"
      defaultValue={this.value}
      filterOption={this.filterOption}
    >
      {Object.keys(this.options).map(key =>
        <Option key={key} value={key}>{this.options[key]}</Option>,
      )}
    </Select>
  );
}

export function GroupedMultipleChoiceAntdWidget() {
  const types = [];
  Object.keys(this.options).forEach((key) => {
    if (types.indexOf(this.options[key].type) === -1) {
      types.push(this.options[key].type);
    }
  });

  const defaultValues = [];
  this.value.forEach((v) => {
    defaultValues.push(v.value);
  });

  return (
    <Select
      mode="multiple"
      placeholder={this.label}
      onChange={this.handleChange}
      className={styles.antdSelect}
      notFoundContent="None"
      defaultValue={defaultValues}
      filterOption={this.filterOption}
    >
      {
        types.map(type =>
          (<OptGroup label={type} key={type}>
            {
              Object.keys(this.options).filter(key => type === this.options[key].type)
                .map(key =>
                  <Option key={this.options[key].value} value={this.options[key].value}>{this.options[key].label}</Option>,
                )
            }
          </OptGroup>),
        )
      }
    </Select>
  );
}
