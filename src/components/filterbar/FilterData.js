import { Form, createFormFields, MultipleChoiceField } from 'react-common';
import { MultipleCheckboxWidget, MultipleChoiceAntdWidget } from './PosWidgets';
import { MultipleChoiceAntdField } from './PosField';

export default class FilterData extends Form {
  constructor(props, store = {}) {
    super(props);
    this.fields = [
      [MultipleChoiceField, { name: 'sensors', label: 'Sensor', required: false, options() { return store.getSensorsFilterOptions(); }, widget: MultipleCheckboxWidget }],
      [MultipleChoiceAntdField, { name: 'vehicleIds', label: 'Name', required: false, options() { return store.getVehicleNameFilterOptions(); }, widget: MultipleChoiceAntdWidget }],
      [MultipleChoiceAntdField, { name: 'groupIds', label: 'Group', required: false, options() { return store.getGroupNameFilterOptions(); }, widget: MultipleChoiceAntdWidget }],
    ];

    createFormFields(this, this.fields, props);
  }
}
